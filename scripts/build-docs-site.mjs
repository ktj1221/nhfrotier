#!/usr/bin/env node
/**
 * 디자인 정본(reference/doc-hub.html)의 DATA 구간을 저장소의 마크다운에서 생성해 채우고
 * 프로젝트문서.html 로 낸다.
 * 실행: node scripts/build-docs-site.mjs
 *
 * 역할 경계: 화면의 CSS와 렌더 로직은 디자인 정본이 정본이다.
 * 이 스크립트는 마크업을 만들지 않고 데이터(BUILD · FEATURES · DOCS)만 만든다.
 *
 * 출력에 벽시계 시각을 넣지 않는다 — 같은 입력이면 같은 출력이어야
 * pre-commit 훅이 매 커밋마다 불필요한 diff를 만들지 않는다.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

import { renderMarkdown } from './lib/markdown.mjs';
import { readLastCommit, readHead, readStagedPaths, readFileMtime } from './lib/git-meta.mjs';
import { collectFeatures } from './lib/fspec.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(SCRIPT_DIR);
const SHELL = join(ROOT, 'reference', 'doc-hub.html');
const OUTPUT = join(ROOT, '프로젝트문서.html');
const SIZE_WARN_BYTES = 900 * 1024;

const BEGIN = '/* DATA:BEGIN */';
const END = '/* DATA:END */';

/** FR 문서 6절의 3단계는 순서가 고정이다. 디자인은 이름으로 읽는다. */
const STAGE_KEYS = ['design', 'proto', 'ops'];

function loadManifest() {
  return JSON.parse(readFileSync(join(SCRIPT_DIR, 'docs-manifest.json'), 'utf8'));
}

function toDocId(path) {
  return basename(path, '.md').replace(/\s+/g, '-');
}

function toPosix(path) {
  return path.split('\\').join('/');
}

function formatDate(isoDate) {
  return isoDate ? isoDate.slice(0, 10) : '알 수 없음';
}

/* ── 문서 수집 ── */

/** 문서를 읽어 렌더링하고 git 메타를 붙인다. 경로 오타는 여기서 즉시 실패시킨다. */
function loadDoc(entry, groupId, context) {
  const absolute = join(ROOT, entry.path);
  if (!existsSync(absolute)) throw new Error(`문서를 찾을 수 없습니다: ${entry.path}`);

  const source = readFileSync(absolute, 'utf8');
  const id = toDocId(entry.path);
  if (context.seen.has(id)) throw new Error(`문서 ID가 중복됩니다: ${id}`);
  context.seen.add(id);

  const { html, headings } = renderMarkdown(source, id, context.docIdByPath);
  const commit = readLastCommit(entry.path, ROOT) || readFileMtime(absolute);

  return {
    ...entry,
    id,
    groupId,
    html,
    headings,
    commit,
    bytes: Buffer.byteLength(source, 'utf8'),
    staged: context.staged.has(toPosix(entry.path)),
  };
}

function collectDocs(manifest, context) {
  return manifest.groups.flatMap((group) =>
    group.docs.map((entry) => loadDoc(entry, group.id, context))
  );
}

function audienceOf(path, roles) {
  return roles.filter((role) => role.docs.includes(path)).map((role) => role.id);
}

/* ── 기능(FR) 링크 띠 ── */

/**
 * 헤딩 텍스트로 페이지 내 앵커를 찾는다.
 * 헤딩 id는 위치 기반(`docId-h3`)이라 문서가 바뀌면 번호가 밀린다. 그래서 번호가 아니라
 * `FR-05` · `US-020` · `S03` 같은 문서상의 식별자로 찾는다. 못 찾으면 링크를 만들지 않고 기록만 한다.
 */
function anchorFinder(docs) {
  const byDoc = new Map(docs.map((doc) => [doc.id, doc.headings]));
  const missing = [];

  function find(docId, predicate, label) {
    const hit = (byDoc.get(docId) || []).find((heading) => predicate(heading.text));
    if (!hit) {
      missing.push(`${docId} ← ${label}`);
      return null;
    }
    return { href: '#' + hit.id, text: hit.text };
  }
  return { find, missing };
}

const startsWith = (prefix) => (text) => text.startsWith(prefix);
const equals = (value) => (text) => text === value;
const AREA_TITLES = { FE: 'FE', BE: 'BE', OPS: 'Infra/DevOps' };

/** 기능 하나에 딸린 정본 위치를 모은다. 문서를 순회하지 않고 한 기능을 끝까지 보게 하는 것이 목적이다. */
function buildFeatureLinks(feature, finder) {
  const groups = [];
  const push = (key, links, mono) => {
    const live = links.filter(Boolean);
    groups.push({ key, mono: Boolean(mono), links: live });
  };
  const link = (hit, label) => hit && { href: hit.href, label: label || hit.text };

  push('제품 요구', [
    link(finder.find('01_PRD', startsWith(feature.id), `${feature.id} 요구사항 절`), null),
  ]);

  push(
    '유저스토리',
    feature.us.map((item) =>
      link(finder.find('02_USER_STORIES_AC', startsWith(item.id), item.id), item.id)
    )
  );

  push(
    '화면',
    feature.screens
      .filter((screen) => screen.code)
      .map((screen) =>
        link(finder.find('03_IA_FUNCTION_SPEC', startsWith(screen.code), screen.code), screen.code)
      )
  );

  push(
    'API',
    feature.apiSection
      ? [link(finder.find('05_API_DB_SPEC', equals(feature.apiSection), feature.apiSection))]
      : [],
    true
  );

  push('백로그', [
    ...feature.index.phases.map((phase) =>
      link(finder.find('06_DEVELOPMENT_BACKLOG', startsWith(phase + '.'), phase), phase)
    ),
    ...feature.index.areas.map((area) => {
      const title = AREA_TITLES[area] || area;
      const tickets = feature.index.tickets.filter((code) => code.startsWith(area + '-'));
      return link(
        finder.find('06_DEVELOPMENT_BACKLOG', equals(title), `${title} 티켓 목록`),
        `${title} — ${tickets.join(' · ')}`
      );
    }),
  ]);

  push(
    '미결',
    feature.openIssues.length > 0
      ? [
          link(
            finder.find('08_DECISIONS_OPEN_ISSUES', startsWith('2.'), '협의 필요 항목'),
            `협의 필요 항목 ${feature.openIssues.length}건`
          ),
        ]
      : []
  );

  return groups;
}

/* ── 디자인이 읽는 데이터로 변환 ── */

function toFeaturePayload(feature) {
  const stages = {};
  STAGE_KEYS.forEach((key, i) => {
    stages[key] = (feature.stages[i] || {}).level || 'todo';
  });

  return {
    id: feature.id,
    doc: feature.docId,
    name: feature.name,
    summary: feature.summary,
    phases: feature.index.phases,
    areas: feature.index.areas,
    open: feature.openIssues.length,
    us: feature.index.us.join(', '),
    screens: feature.index.screenNote,
    api: feature.index.apiNote,
    ticket: feature.index.tickets.join(' · '),
    stages,
    links: feature.links,
  };
}

function toDocPayload(doc, manifest, labelByGroupId, featureByDocId, headRef) {
  // 최신 커밋에서 바뀐 문서만 표시한다. "최근 N일" 규칙은 초기에 전 문서가
  // 같은 날 커밋돼 있어 모든 항목에 점이 찍히므로 신호가 되지 못한다.
  const changed =
    doc.staged || Boolean(headRef && doc.commit && doc.commit.hash === headRef.hash);
  const feature = featureByDocId.get(doc.id);

  return {
    id: doc.id,
    group: labelByGroupId.get(doc.groupId),
    title: doc.title,
    lede: doc.note || '',
    author: (doc.commit && doc.commit.author) || '알 수 없음',
    commit: (doc.commit && doc.commit.hash) || '',
    date: formatDate(doc.commit && doc.commit.isoDate),
    path: toPosix(doc.path),
    size: `${Math.round(doc.bytes / 1024)}KB`,
    changed,
    roles: audienceOf(doc.path, manifest.roles),
    ...(feature ? { feature: feature.id } : {}),
    body: doc.html,
  };
}

/* ── 주입 ── */

/** `</script` 는 문자열 안에 있어도 script 요소를 닫는다. 이스케이프해야 인라인할 수 있다. */
function serialize(value) {
  return JSON.stringify(value).split('</').join('<\\/');
}

function renderDataBlock(build, roles, features, docs) {
  return [
    BEGIN,
    `var BUILD = ${serialize(build)};`,
    '',
    `var ROLES = ${serialize(roles)};`,
    '',
    `var FEATURES = ${serialize(features)};`,
    '',
    `var DOCS = ${serialize(docs)};`,
    END,
  ].join('\n');
}

function injectData(shell, block) {
  const from = shell.indexOf(BEGIN);
  const to = shell.indexOf(END);
  if (from === -1 || to === -1 || to < from) {
    throw new Error(`디자인 정본에서 ${BEGIN} ~ ${END} 구간을 찾지 못했습니다: reference/doc-hub.html`);
  }
  return shell.slice(0, from) + block + shell.slice(to + END.length);
}

/* ── 실행 ── */

function build() {
  const manifest = loadManifest();
  const context = {
    seen: new Set(),
    staged: readStagedPaths(ROOT),
    docIdByPath: new Map(
      manifest.groups.flatMap((group) => group.docs.map((doc) => [doc.path, toDocId(doc.path)]))
    ),
  };

  const docs = collectDocs(manifest, context);
  const headRef = readHead(ROOT);
  const labelByGroupId = new Map(manifest.groups.map((group) => [group.id, group.label]));

  const finder = anchorFinder(docs);
  const features = collectFeatures(ROOT, manifest).map((feature) => {
    const docId = toDocId(feature.path);
    return { ...feature, docId, links: buildFeatureLinks(feature, finder) };
  });
  const featureByDocId = new Map(features.map((feature) => [feature.docId, feature]));

  const build = {
    commit: headRef ? headRef.hash : '0000000',
    date: formatDate(headRef && headRef.isoDate),
    version: headRef ? `v${formatDate(headRef.isoDate).split('-').join('.')}` : 'dev',
  };

  if (!existsSync(SHELL)) throw new Error('디자인 정본이 없습니다: reference/doc-hub.html');
  const html = injectData(
    readFileSync(SHELL, 'utf8'),
    renderDataBlock(
      build,
      manifest.roles.map((role) => ({
        id: role.id,
        label: role.label,
        desc: role.desc || '',
        docs: role.docs.map(toDocId),
      })),
      features.map(toFeaturePayload),
      docs.map((doc) => toDocPayload(doc, manifest, labelByGroupId, featureByDocId, headRef))
    )
  );

  writeFileSync(OUTPUT, html, 'utf8');

  const bytes = Buffer.byteLength(html, 'utf8');
  const headings = docs.reduce((sum, doc) => sum + doc.headings.length, 0);
  console.log(
    `문서 ${docs.length}개 · 기능 ${features.length}개 · 헤딩 ${headings}개 → 프로젝트문서.html (${Math.round(bytes / 1024)}KB)`
  );

  if (finder.missing.length > 0) {
    console.warn(`앵커를 찾지 못한 링크 ${finder.missing.length}건:`);
    finder.missing.forEach((item) => console.warn(`  ${item}`));
  }
  if (bytes > SIZE_WARN_BYTES) {
    console.warn(`경고: ${Math.round(bytes / 1024)}KB 입니다. 분할을 검토하세요.`);
  }

  const staged = docs.filter((doc) => doc.staged);
  if (staged.length > 0) {
    console.log('  이번 커밋에서 수정됨: ' + staged.map((doc) => toPosix(doc.path)).join(', '));
  }
}

build();
