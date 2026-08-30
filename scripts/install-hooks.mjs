#!/usr/bin/env node
/**
 * git 훅을 활성화한다. 클론 후 1회만 실행하면 된다.
 * 실행: node scripts/install-hooks.mjs
 *
 * .git/hooks 는 커밋되지 않으므로 훅을 .githooks/ 에 두고 core.hooksPath 로 가리킨다.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const HOOKS_PATH = '.githooks';

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

function currentHooksPath() {
  try {
    return git(['config', '--get', 'core.hooksPath']);
  } catch {
    return '';
  }
}

if (currentHooksPath() === HOOKS_PATH) {
  console.log(`이미 설정되어 있습니다: core.hooksPath=${HOOKS_PATH}`);
} else {
  git(['config', 'core.hooksPath', HOOKS_PATH]);
  console.log(`설정 완료: core.hooksPath=${HOOKS_PATH}`);
}

// Windows 체크아웃은 실행 비트를 보존하지 않으므로 인덱스에 직접 기록한다.
try {
  git(['update-index', '--chmod=+x', `${HOOKS_PATH}/pre-commit`]);
  console.log('실행 권한 기록 완료: .githooks/pre-commit');
} catch {
  console.log('실행 권한은 파일이 커밋된 뒤에 기록됩니다.');
}

console.log('이제 문서를 수정하고 커밋하면 프로젝트문서.html 이 자동으로 갱신됩니다.');
