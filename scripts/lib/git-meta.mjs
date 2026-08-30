import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

/** 커밋 제목에 들어갈 수 있는 문자를 피해 Unit Separator를 구분자로 쓴다. */
const FIELD = String.fromCharCode(31);
/** %aN·%aE 는 .mailmap 이 적용된 값이다. %an 은 원문이라 같은 사람이 여러 이름으로 갈린다. */
const LOG_FORMAT = ['%h', '%cI', '%aN'].join('%x1f');

/** 셸을 거치지 않는 execFile — 경로에 공백·한글이 있어도 안전하다 (SECURITY.md D-2). */
function runGit(args, cwd) {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return '';
  }
}

export function readLastCommit(relativePath, cwd) {
  const output = runGit(['log', '-1', `--format=${LOG_FORMAT}`, '--', relativePath], cwd).trim();
  if (!output) return null;

  const [hash, isoDate, author] = output.split(FIELD);
  return { hash, isoDate, author };
}

/** 한 경로를 건드린 커밋 전체. 최신순이다. */
export function readCommitHistory(relativePath, cwd) {
  const output = runGit(['log', `--format=${LOG_FORMAT}`, '--', relativePath], cwd).trim();
  if (!output) return [];

  return output.split('\n').map((line) => {
    const [hash, isoDate, author] = line.split(FIELD);
    return { hash, isoDate, author };
  });
}

export function readHead(cwd) {
  const output = runGit(['log', '-1', `--format=${LOG_FORMAT}`], cwd).trim();
  if (!output) return null;

  const [hash, isoDate, author] = output.split(FIELD);
  return { hash, isoDate, author };
}

/**
 * 스테이징된 경로 집합.
 * 한글 경로가 `"docs/NH\353..."` 로 quote되는 것을 피하려고 -z (NUL 구분, 무가공)를 쓴다.
 */
export function readStagedPaths(cwd) {
  const output = runGit(['diff', '--cached', '--name-only', '-z'], cwd);
  return new Set(output.split('\0').filter(Boolean));
}

/**
 * 스테이징된 경로 → 변경 상태(A/M/D/R/C) Map.
 * -z 출력은 R·C 일 때만 [상태, 이전경로, 새경로] 3토큰이고 나머지는 2토큰이다.
 */
export function readStagedStatuses(cwd) {
  const tokens = runGit(
    ['diff', '--cached', '--name-status', '-z', '--diff-filter=ACMRD'],
    cwd
  ).split('\0');

  const statuses = new Map();
  for (let i = 0; i < tokens.length; ) {
    const status = tokens[i];
    if (!status) break;

    const isRename = status[0] === 'R' || status[0] === 'C';
    const path = tokens[i + (isRename ? 2 : 1)];
    if (path) statuses.set(path, status[0]);
    i += isRename ? 3 : 2;
  }
  return statuses;
}

/** 현재 커밋 작성자 이름을 .mailmap 기준으로 정규화해 돌려준다. */
export function readCurrentAuthor(cwd) {
  const name = runGit(['config', 'user.name'], cwd).trim();
  const email = runGit(['config', 'user.email'], cwd).trim();
  if (!name) return '';
  if (!email) return name;

  const resolved = runGit(['check-mailmap', `${name} <${email}>`], cwd).trim();
  const match = resolved.match(/^(.*?)\s*<[^>]*>$/);
  return match ? match[1] : name;
}

export function readFileMtime(absolutePath) {
  try {
    return { hash: null, isoDate: statSync(absolutePath).mtime.toISOString(), author: null };
  } catch {
    return null;
  }
}
