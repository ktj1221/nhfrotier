#!/usr/bin/env node
/**
 * 작업 시작 전 dev 를 자기 브랜치로 땡겨온다.
 * 실행: node scripts/sync-dev.mjs
 *
 * 팀 정책(CLAUDE.md "브랜치 운영")을 한 커맨드로 만든 것이다.
 *   1. dev·main 위에서 작업하려 하면 막는다 — 개인 브랜치에서만 개발한다
 *   2. git 훅이 꺼져 있으면 켠다 — 문서 자동 갱신이 조용히 누락되는 걸 막는다
 *   3. origin/dev 를 현재 브랜치로 merge 한다
 *
 * 되돌리기 어려운 상태를 만들지 않는다. 작업 트리가 더러우면 아무것도 하지 않고 멈춘다.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(SCRIPT_DIR);

const BASE_BRANCH = 'dev';
const REMOTE = 'origin';
/** 이 브랜치들 위에서는 개발하지 않는다. PR 로만 반영한다. */
const PROTECTED_BRANCHES = ['dev', 'main'];
const HOOKS_PATH = '.githooks';

/** 셸을 거치지 않는 execFile — 경로에 공백·한글이 있어도 안전하다 (SECURITY.md D-2). */
function git(args) {
  return execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

/** 진행 상황을 그대로 보여줘야 하는 명령. 실패하면 throw 한다. */
function gitLive(args) {
  execFileSync('git', args, { cwd: ROOT, stdio: 'inherit' });
}

function tryGit(args) {
  try {
    return git(args);
  } catch {
    return '';
  }
}

function fail(message, hint) {
  console.error(`\n중단: ${message}`);
  if (hint) console.error(`      ${hint}`);
  process.exit(1);
}

/* ── 사전 점검 ── */

function readCurrentBranch() {
  const branch = tryGit(['symbolic-ref', '--short', 'HEAD']);
  if (!branch) {
    fail(
      'detached HEAD 상태입니다.',
      `자기 브랜치로 이동한 뒤 다시 실행하세요: git switch <이름>`,
    );
  }
  return branch;
}

function assertPersonalBranch(branch) {
  if (!PROTECTED_BRANCHES.includes(branch)) return;

  fail(
    `'${branch}' 브랜치 위에 있습니다. 여기서 직접 개발하지 않습니다.`,
    `자기 브랜치로 이동한 뒤 다시 실행하세요: git switch <이름>`,
  );
}

/** 추적 중인 파일의 변경만 본다. untracked 파일은 merge 를 방해하지 않는다. */
function assertCleanWorktree() {
  const tracked = tryGit(['status', '--porcelain'])
    .split('\n')
    .filter((line) => line && !line.startsWith('??'));
  if (tracked.length === 0) return;

  fail(
    `커밋되지 않은 변경이 ${tracked.length}건 있습니다.`,
    'merge 전에 커밋하거나 git stash 로 치워두세요.',
  );
}

/* ── 훅 활성화 ── */

/** .git/hooks 는 커밋되지 않으므로 core.hooksPath 로 .githooks 를 가리킨다. */
function ensureHooksEnabled() {
  if (tryGit(['config', '--get', 'core.hooksPath']) === HOOKS_PATH) return;

  git(['config', 'core.hooksPath', HOOKS_PATH]);
  console.log(`훅 활성화: core.hooksPath=${HOOKS_PATH} (문서 커밋 시 프로젝트문서.html 자동 갱신)`);
}

/* ── 동기화 ── */

function countCommits(range) {
  const output = tryGit(['rev-list', '--count', range]);
  return Number.parseInt(output, 10) || 0;
}

function mergeBase(branch) {
  const target = `${REMOTE}/${BASE_BRANCH}`;
  const behind = countCommits(`HEAD..${target}`);

  if (behind === 0) {
    console.log(`\n이미 최신입니다 — ${branch} 는 ${target} 를 모두 포함합니다.`);
    return;
  }

  console.log(`\n${target} 의 커밋 ${behind}개를 ${branch} 로 가져옵니다.`);
  try {
    gitLive(['merge', '--no-edit', target]);
  } catch {
    fail(
      'merge 충돌이 발생했습니다.',
      '충돌을 해결하고 git add 후 git commit 하세요. 되돌리려면 git merge --abort.',
    );
  }
}

function reportStatus(branch) {
  const ahead = countCommits(`${REMOTE}/${BASE_BRANCH}..HEAD`);

  console.log(`\n준비 완료 — ${branch}`);
  if (ahead > 0) {
    console.log(`  ${BASE_BRANCH} 에 아직 없는 커밋 ${ahead}개가 있습니다.`);
    console.log(`  작업을 마치면: git push ${REMOTE} ${branch} → GitHub 에서 ${BASE_BRANCH} 로 PR`);
  } else {
    console.log(`  이제 이 브랜치에서 작업하세요.`);
  }
}

/* ── 실행 ── */

const branch = readCurrentBranch();
assertPersonalBranch(branch);
assertCleanWorktree();
ensureHooksEnabled();

console.log(`${REMOTE} 에서 최신 내용을 받아옵니다...`);
gitLive(['fetch', '--prune', REMOTE]);

mergeBase(branch);
reportStatus(branch);
