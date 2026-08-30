#!/usr/bin/env node
/**
 * 개발문서/기능명세/00_CHANGELOG.md 의 변경 이력 표를 갱신한다.
 * 실행: node scripts/build-fspec-changelog.mjs
 *
 * 훅이 채우는 칸: 날짜 · 작성자 · 커밋 · 대상 파일 · 유형
 * 사람이 채우는 칸: 변경 내용 · 사유 (읽기만 하고 절대 덮어쓰지 않는다)
 *
 * 출력은 결정적이어야 한다 — 같은 저장소 상태면 같은 표가 나와야
 * pre-commit 훅이 매 커밋마다 불필요한 diff를 만들지 않는다.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename, posix } from 'node:path';

import { readCommitHistory, readStagedStatuses, readCurrentAuthor } from './lib/git-meta.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(SCRIPT_DIR);

const SPEC_DIR = '개발문서/기능명세';
const CHANGELOG_PATH = posix.join(SPEC_DIR, '00_CHANGELOG.md');
const BEGIN = '<!-- CHANGELOG:BEGIN';
const END = '<!-- CHANGELOG:END -->';

const HEADER = ['날짜', '작성자', '커밋', '대상 파일', '유형', '변경 내용', '사유 · 근거'];
const SEPARATOR = HEADER.map(() => '---');
const EMPTY = '—';
const UNSET = '-';

const TYPE_BY_STATUS = { A: '신규', M: '수정', D: '삭제', R: '이름변경', C: '신규' };

/* ── 표 파싱 · 렌더링 ── */

/** `\|` 로 escape된 파이프는 칸 구분자가 아니다. */
function splitRow(line) {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim());
}

function toRow(cells) {
  const [date, author, commit, file, type, content, reason] = cells;
  return {
    date: date ?? '',
    author: author ?? '',
    commit: commit || UNSET,
    file: file ?? '',
    type: type ?? '',
    content: content || EMPTY,
    reason: reason || EMPTY,
  };
}

function parseRows(block) {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'))
    .map(splitRow)
    .filter((cells) => cells.length >= HEADER.length)
    .filter((cells) => cells[0] !== HEADER[0])
    .filter((cells) => !cells.every((cell) => /^:?-{2,}:?$/.test(cell)))
    .map(toRow);
}

function renderTable(rows) {
  const lines = [
    `| ${HEADER.join(' | ')} |`,
    `|${SEPARATOR.map((dash) => `${dash}`).join('|')}|`,
    ...rows.map((row) =>
      `| ${[row.date, row.author, row.commit, row.file, row.type, row.content, row.reason].join(' | ')} |`
    ),
  ];
  return lines.join('\n');
}

/* ── 갱신 규칙 ── */

const isUnset = (value) => !value || value === UNSET || value === EMPTY;
const isPending = (row) => isUnset(row.commit);

function today() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** 기능명세 md 중 이 파일 자신은 제외한다 — 훅이 스스로를 기록하면 무한히 자란다. */
function stagedSpecFiles() {
  const statuses = readStagedStatuses(ROOT);
  const result = new Map();

  for (const [path, status] of statuses) {
    if (!path.startsWith(`${SPEC_DIR}/`) || !path.endsWith('.md')) continue;
    if (path === CHANGELOG_PATH) continue;
    result.set(basename(path), status);
  }
  return result;
}

/** staged 인데 미확정 행이 없는 파일에 행을 만든다. */
function addMissingRows(rows, staged) {
  const pendingFiles = new Set(rows.filter(isPending).map((row) => row.file));

  for (const file of [...staged.keys()].sort()) {
    if (pendingFiles.has(file)) continue;
    rows.push({
      date: '',
      author: '',
      commit: UNSET,
      file,
      type: TYPE_BY_STATUS[staged.get(file)] ?? '수정',
      content: EMPTY,
      reason: EMPTY,
    });
  }
}

function fillPendingRows(rows, staged, author) {
  const date = today();

  for (const row of rows) {
    if (!isPending(row) || !staged.has(row.file)) continue;
    if (!row.date) row.date = date;
    if (!row.author) row.author = author;
    if (isUnset(row.type)) row.type = TYPE_BY_STATUS[staged.get(row.file)] ?? '수정';
  }
}

/**
 * 이미 커밋된 미확정 행에 해시를 채운다.
 *
 * 훅은 커밋 직전에 날짜를 찍으므로, 그 행을 담은 커밋은 "날짜 이후 첫 커밋"이다.
 * 최신 커밋을 쓰면 아직 커밋되지 않은 행에 엉뚱한 옛 해시가 붙는다.
 * 날짜가 없는 행은 훅을 거친 적이 없다 = 아직 커밋 전이므로 건드리지 않는다.
 */
function backfillCommits(rows, staged) {
  for (const row of rows) {
    if (!isPending(row) || staged.has(row.file) || !row.file || !row.date) continue;

    const history = readCommitHistory(posix.join(SPEC_DIR, row.file), ROOT);
    const commit = history.filter((entry) => entry.isoDate.slice(0, 10) >= row.date).pop();
    if (!commit?.hash) continue;

    row.commit = commit.hash;
    if (!row.author) row.author = commit.author;
  }
}

/** 미확정 행이 맨 위, 그 아래는 최신순. 동률은 문자열로 끊어 출력을 결정적으로 만든다. */
function sortRows(rows) {
  const key = (row) => [row.date || '9999-99-99', row.file, row.commit, row.content];

  rows.sort((left, right) => {
    const [leftDate, ...leftRest] = key(left);
    const [rightDate, ...rightRest] = key(right);
    if (leftDate !== rightDate) return leftDate < rightDate ? 1 : -1;

    for (let i = 0; i < leftRest.length; i += 1) {
      if (leftRest[i] !== rightRest[i]) return leftRest[i] < rightRest[i] ? -1 : 1;
    }
    return 0;
  });
}

/* ── 실행 ── */

function build() {
  const absolute = join(ROOT, CHANGELOG_PATH);
  if (!existsSync(absolute)) throw new Error(`변경 이력 파일이 없습니다: ${CHANGELOG_PATH}`);

  const source = readFileSync(absolute, 'utf8');
  const beginIndex = source.indexOf(BEGIN);
  const endIndex = source.indexOf(END);
  if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
    throw new Error(`${CHANGELOG_PATH}: CHANGELOG:BEGIN / CHANGELOG:END 주석을 찾을 수 없습니다.`);
  }

  const blockStart = source.indexOf('\n', beginIndex) + 1;
  const rows = parseRows(source.slice(blockStart, endIndex));
  const staged = stagedSpecFiles();

  addMissingRows(rows, staged);
  fillPendingRows(rows, staged, readCurrentAuthor(ROOT));
  backfillCommits(rows, staged);
  sortRows(rows);

  const updated = `${source.slice(0, blockStart)}\n${renderTable(rows)}\n\n${source.slice(endIndex)}`;
  if (updated === source) {
    console.log(`변경 이력 ${rows.length}행 — 변경 없음`);
    return;
  }

  writeFileSync(absolute, updated, 'utf8');
  const pending = rows.filter(isPending).length;
  console.log(`변경 이력 ${rows.length}행 갱신 (미확정 ${pending}행) → ${CHANGELOG_PATH}`);
}

build();
