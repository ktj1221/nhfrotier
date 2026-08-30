import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

/** 커밋 제목에 들어갈 수 있는 문자를 피해 Unit Separator를 구분자로 쓴다. */
const FIELD = String.fromCharCode(31);
const LOG_FORMAT = ['%h', '%cI', '%an'].join('%x1f');

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

export function readFileMtime(absolutePath) {
  try {
    return { hash: null, isoDate: statSync(absolutePath).mtime.toISOString(), author: null };
  } catch {
    return null;
  }
}
