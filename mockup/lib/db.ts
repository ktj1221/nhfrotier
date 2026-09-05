import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'mockup.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    migrate(db);
  }
  return db;
}

const SCHEMA_V1 = `
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS reference_screens (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      name TEXT NOT NULL,
      image_data TEXT NOT NULL,
      mime_type TEXT NOT NULL DEFAULT 'image/png',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS mockup_versions (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      proposal_content TEXT NOT NULL,
      html_content TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'member',
      color TEXT NOT NULL DEFAULT 'indigo',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS project_members (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'member',
      joined_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(project_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      mockup_version_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (mockup_version_id) REFERENCES mockup_versions(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS responsibility_reviews (
      id TEXT PRIMARY KEY,
      mockup_version_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'RUNNING',
      model TEXT,
      error TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (mockup_version_id) REFERENCES mockup_versions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS responsibility_findings (
      id TEXT PRIMARY KEY,
      review_id TEXT NOT NULL,
      rule_id TEXT NOT NULL,
      category TEXT NOT NULL,
      severity TEXT NOT NULL,
      title TEXT NOT NULL,
      evidence TEXT NOT NULL,
      why TEXT NOT NULL,
      suggestion TEXT NOT NULL,
      needs_compliance_review INTEGER NOT NULL DEFAULT 0,
      decision TEXT,
      decision_by TEXT,
      decision_reason TEXT,
      decided_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (review_id) REFERENCES responsibility_reviews(id) ON DELETE CASCADE,
      FOREIGN KEY (decision_by) REFERENCES users(id) ON DELETE SET NULL
    );
`;

/**
 * PRAGMA user_version 기반 순차 마이그레이션.
 * 배열 인덱스 i를 적용하면 user_version이 i+1이 된다.
 * 기존 DB는 user_version이 0이라 v1이 다시 실행되지만 전부 IF NOT EXISTS라 멱등이다.
 * 각 단계는 새 테이블 추가·ADD COLUMN 같은 가산적 변경만 담는다.
 * 테이블 재구축은 foreign_keys=ON과 충돌하므로 이 러너에 넣지 않는다.
 */
/**
 * 협업 디자인 캔버스.
 * 화면(screens) · 요소 지문(screen_elements) · 편집 패치(element_patches)를 추가하고
 * comments에 요소 앵커를 붙인다. mockup_versions는 건드리지 않는다 —
 * html_content는 sort_order=0 화면의 HTML로 계속 채워져 기존 조회·다운로드가 그대로 동작한다.
 */
const SCHEMA_V2 = `
    CREATE TABLE IF NOT EXISTS screens (
      id TEXT PRIMARY KEY,
      mockup_version_id TEXT NOT NULL,
      screen_key TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      html_content TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      error_message TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (mockup_version_id) REFERENCES mockup_versions(id) ON DELETE CASCADE,
      UNIQUE(mockup_version_id, screen_key)
    );

    CREATE TABLE IF NOT EXISTS screen_elements (
      id TEXT PRIMARY KEY,
      screen_id TEXT NOT NULL,
      nh_id TEXT NOT NULL,
      tag TEXT NOT NULL,
      doc_order INTEGER NOT NULL,
      path_sig TEXT NOT NULL,
      text_sig TEXT,
      FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE,
      UNIQUE(screen_id, nh_id)
    );

    CREATE TABLE IF NOT EXISTS element_patches (
      id TEXT PRIMARY KEY,
      screen_id TEXT NOT NULL,
      nh_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      op TEXT NOT NULL,
      payload TEXT NOT NULL,
      reason TEXT,
      source TEXT NOT NULL DEFAULT 'manual',
      seq INTEGER NOT NULL,
      reverted_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(screen_id, seq)
    );

    CREATE INDEX IF NOT EXISTS idx_patches_screen_seq ON element_patches(screen_id, seq);
    CREATE INDEX IF NOT EXISTS idx_screens_version ON screens(mockup_version_id, sort_order);
`;

/**
 * comments 확장은 ADD COLUMN이라 IF NOT EXISTS가 없다.
 * 이미 있는 컬럼이면 조용히 넘어간다 — 러너가 멱등해야 하기 때문이다.
 * REFERENCES 절은 일부러 붙이지 않는다: foreign_keys=ON 상태의 ADD COLUMN에 제약이 있어
 * 관계는 코드에서 강제한다.
 */
function addCommentAnchorColumns(db: Database.Database) {
  const existing = new Set(
    (db.pragma('table_info(comments)') as Array<{ name: string }>).map((c) => c.name)
  );
  const columns: Array<[string, string]> = [
    ['screen_id', 'TEXT'],
    ['nh_id', 'TEXT'],
    ['anchor_status', "TEXT NOT NULL DEFAULT 'none'"],
    ['resolved_at', 'TEXT'],
  ];
  for (const [name, type] of columns) {
    if (!existing.has(name)) db.exec(`ALTER TABLE comments ADD COLUMN ${name} ${type}`);
  }
}

const MIGRATIONS: Array<(db: Database.Database) => void> = [
  (db) => db.exec(SCHEMA_V1),
  (db) => {
    db.exec(SCHEMA_V2);
    addCommentAnchorColumns(db);
  },
];

function migrate(db: Database.Database) {
  const current = db.pragma('user_version', { simple: true }) as number;
  for (let v = current; v < MIGRATIONS.length; v++) {
    db.transaction(() => {
      MIGRATIONS[v](db);
      db.pragma(`user_version = ${v + 1}`);
    })();
  }
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface ReferenceScreen {
  id: string;
  project_id: string;
  name: string;
  image_data: string;
  mime_type: string;
  created_at: string;
}

export interface MockupVersion {
  id: string;
  project_id: string;
  version: number;
  proposal_content: string;
  html_content: string;
  description: string | null;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  color: string;
  created_at: string;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  user_name?: string;
  user_color?: string;
  user_role?: string;
}

/** 'none' = 요소를 지목하지 않은 일반 의견. 'orphaned' = 재생성으로 앵커가 끊긴 상태. */
export type AnchorStatus = 'none' | 'anchored' | 'orphaned';

export interface Comment {
  id: string;
  mockup_version_id: string;
  user_id: string;
  content: string;
  created_at: string;
  screen_id: string | null;
  nh_id: string | null;
  anchor_status: AnchorStatus;
  resolved_at: string | null;
  user_name?: string;
  user_color?: string;
}

export type ScreenStatus = 'pending' | 'generating' | 'ready' | 'failed';

export interface Screen {
  id: string;
  mockup_version_id: string;
  /** data-goto가 가리키는 값. 한 버전 안에서 유일하다. */
  screen_key: string;
  name: string;
  role: string | null;
  sort_order: number;
  /** 정제 + data-nh-id 부여를 마친 HTML. 미생성이면 null. 런타임 스크립트는 포함하지 않는다. */
  html_content: string | null;
  status: ScreenStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScreenElement {
  id: string;
  screen_id: string;
  nh_id: string;
  tag: string;
  doc_order: number;
  path_sig: string;
  text_sig: string | null;
}

/** aiRewrite는 선택한 요소만 AI가 다시 만든 결과다. */
export type PatchOpKind = 'setText' | 'setStyle' | 'setAttr' | 'aiRewrite';

export interface ElementPatch {
  id: string;
  screen_id: string;
  nh_id: string;
  user_id: string;
  op: PatchOpKind;
  /** JSON 문자열. op에 따라 형태가 다르다. */
  payload: string;
  reason: string | null;
  source: 'manual' | 'ai';
  seq: number;
  reverted_at: string | null;
  created_at: string;
  user_name?: string;
  user_color?: string;
}

export interface ChatMessage {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name?: string;
  user_color?: string;
}

export type ReviewStatus = 'RUNNING' | 'DONE' | 'FAILED';

/** 반영 / 보류 / 반려 / 준법 검토 요청 */
export type FindingDecision = 'ACCEPTED' | 'DEFERRED' | 'REJECTED' | 'COMPLIANCE_REQUESTED';

export interface ResponsibilityReview {
  id: string;
  mockup_version_id: string;
  status: ReviewStatus;
  model: string | null;
  error: string | null;
  created_at: string;
}

export interface ResponsibilityFindingRow {
  id: string;
  review_id: string;
  rule_id: string;
  category: string;
  severity: string;
  title: string;
  evidence: string;
  why: string;
  suggestion: string;
  needs_compliance_review: number;
  decision: FindingDecision | null;
  decision_by: string | null;
  decision_reason: string | null;
  decided_at: string | null;
  created_at: string;
  decided_by_name?: string;
  decided_by_color?: string;
}
