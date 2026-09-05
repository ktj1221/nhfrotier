import type { Database } from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { processGeneratedHtml } from './htmlPipeline';
import type { Screen, ScreenElement } from '../db';

/** 다화면 이전에 만들어진 목업을 화면 1장으로 볼 때 쓰는 key. */
export const LEGACY_SCREEN_KEY = 'main';

/**
 * 생성된 HTML을 정제·식별자 부여한 뒤 screens와 screen_elements에 기록한다.
 * 같은 (버전, screen_key)로 다시 부르면 기존 행을 덮어쓰므로 재시도에 안전하다.
 * 호출자가 트랜잭션을 열어야 한다 — 화면과 요소가 따로 커밋되면 안 된다.
 *
 * 반환값의 html은 정제된 결과다. mockup_versions.html_content에도 이걸 넣어야
 * 저장본과 화면이 어긋나지 않는다.
 */
export function saveScreenHtml(
  db: Database,
  args: {
    mockupVersionId: string;
    screenKey: string;
    name: string;
    role?: string | null;
    sortOrder?: number;
    rawHtml: string;
    knownScreenKeys: string[];
  }
): { screenId: string; html: string; warnings: string[]; elementCount: number } {
  const { html, elements, warnings } = processGeneratedHtml(args.rawHtml, {
    knownScreenKeys: args.knownScreenKeys,
  });

  const existing = db
    .prepare('SELECT id FROM screens WHERE mockup_version_id = ? AND screen_key = ?')
    .get(args.mockupVersionId, args.screenKey) as { id: string } | undefined;

  const screenId = existing?.id ?? uuidv4();

  if (existing) {
    db.prepare(
      `UPDATE screens
          SET name = ?, role = ?, sort_order = ?, html_content = ?,
              status = 'ready', error_message = NULL, updated_at = datetime('now')
        WHERE id = ?`
    ).run(args.name, args.role ?? null, args.sortOrder ?? 0, html, screenId);

    db.prepare('DELETE FROM screen_elements WHERE screen_id = ?').run(screenId);
  } else {
    db.prepare(
      `INSERT INTO screens (id, mockup_version_id, screen_key, name, role, sort_order, html_content, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'ready')`
    ).run(
      screenId,
      args.mockupVersionId,
      args.screenKey,
      args.name,
      args.role ?? null,
      args.sortOrder ?? 0,
      html
    );
  }

  const insertElement = db.prepare(
    `INSERT INTO screen_elements (id, screen_id, nh_id, tag, doc_order, path_sig, text_sig)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  for (const el of elements) {
    insertElement.run(uuidv4(), screenId, el.nhId, el.tag, el.docOrder, el.pathSig, el.textSig);
  }

  return { screenId, html, warnings, elementCount: elements.length };
}

/**
 * screens 행이 없는 옛 목업을 화면 1장짜리로 승격한다.
 * 캔버스가 legacy 분기를 갖지 않도록, 읽기 시점에 조용히 정규화하는 것이 목적이다.
 * 멱등하며, 이미 화면이 있으면 그대로 반환한다.
 */
export function ensureScreens(
  db: Database,
  mockupVersionId: string,
  legacyHtml: string
): Screen[] {
  const rows = db
    .prepare('SELECT * FROM screens WHERE mockup_version_id = ? ORDER BY sort_order ASC')
    .all(mockupVersionId) as Screen[];

  if (rows.length > 0) return rows;

  db.transaction(() => {
    saveScreenHtml(db, {
      mockupVersionId,
      screenKey: LEGACY_SCREEN_KEY,
      name: '화면 1',
      sortOrder: 0,
      rawHtml: legacyHtml,
      knownScreenKeys: [LEGACY_SCREEN_KEY],
    });
  })();

  return db
    .prepare('SELECT * FROM screens WHERE mockup_version_id = ? ORDER BY sort_order ASC')
    .all(mockupVersionId) as Screen[];
}

export function listScreenElements(db: Database, screenId: string): ScreenElement[] {
  return db
    .prepare('SELECT * FROM screen_elements WHERE screen_id = ? ORDER BY doc_order ASC')
    .all(screenId) as ScreenElement[];
}
