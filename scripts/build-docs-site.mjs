#!/usr/bin/env node
/**
 * 프로젝트 문서(.md)를 단일 자기완결형 HTML 하나로 묶는다.
 * 실행: node scripts/build-docs-site.mjs
 *
 * 출력에 벽시계 시각을 넣지 않는다 — 같은 입력이면 같은 출력이어야
 * pre-commit 훅이 매 커밋마다 불필요한 diff를 만들지 않는다.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

import { renderMarkdown, escapeHtml } from './lib/markdown.mjs';
import { readLastCommit, readHead, readStagedPaths, readFileMtime } from './lib/git-meta.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(SCRIPT_DIR);
const OUTPUT = join(ROOT, '프로젝트문서.html');
const SIZE_WARN_BYTES = 600 * 1024;

function loadManifest() {
  return JSON.parse(readFileSync(join(SCRIPT_DIR, 'docs-manifest.json'), 'utf8'));
}

function loadAsset(name) {
  const source = readFileSync(join(SCRIPT_DIR, 'assets', name), 'utf8');
  if (source.includes('</script')) throw new Error(`${name}: </script 시퀀스는 인라인할 수 없습니다.`);
  return source;
}

/**
 * 나루뱅크 디자인 시스템 토큰을 인라인한다. `design-system/styles.css`의 @import 순서를 따르되
 * icons.css(Lucide CDN)와 keyframes.css는 뺀다 — 아이콘을 쓰지 않고, Artifact CSP가 외부 호스트를
 * 막아 어차피 로드되지 않는다. fonts.css는 남긴다: Artifact 안에서는 차단되어 시스템 한글 폰트로
 * 폴백하고, 사내 서버나 로컬에서 열면 Pretendard가 정상 적용된다.
 */
const DESIGN_TOKENS = [
  'fonts.css',
  'colors.css',
  'typography.css',
  'spacing.css',
  'radius.css',
  'elevation.css',
  'motion.css',
  'base.css',
];

function loadDesignTokens() {
  const dir = join(ROOT, 'design-system', 'tokens');
  return DESIGN_TOKENS.map((name) => {
    const path = join(dir, name);
    if (!existsSync(path)) throw new Error(`디자인 시스템 토큰이 없습니다: design-system/tokens/${name}`);
    return readFileSync(path, 'utf8');
  }).join('\n');
}

function toDocId(path) {
  return basename(path, '.md').replace(/\s+/g, '-');
}

function formatDate(isoDate) {
  return isoDate ? isoDate.slice(0, 10) : '알 수 없음';
}

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
    staged: context.staged.has(entry.path.split('\\').join('/')),
  };
}

function collectDocs(manifest, context) {
  return manifest.groups.flatMap((group) =>
    group.docs.map((entry) => loadDoc(entry, group.id, context))
  );
}

function audienceOf(path, roles) {
  return roles.filter((role) => role.docs.includes(path)).map((role) => role.id).join(' ');
}

/* ── 마크업 조립 ── */

function renderNav(manifest, docs, headRef) {
  return manifest.groups
    .map((group) => {
      const links = docs
        .filter((doc) => doc.groupId === group.id)
        .map((doc) => {
          // 최신 커밋에서 바뀐 문서만 표시한다. "최근 N일" 규칙은 초기에 전 문서가
          // 같은 날 커밋돼 있어 모든 항목에 점이 찍히므로 신호가 되지 못한다.
          const fresh = doc.staged || Boolean(headRef && doc.commit && doc.commit.hash === headRef.hash);
          const sub = doc.headings
            .filter((heading) => heading.level === 2)
            .map((h) => `<a href="#${h.id}">${escapeHtml(h.text)}</a>`)
            .join('');
          const cls = 'doc-link' + (fresh ? ' recent' : '');
          const audience = audienceOf(doc.path, manifest.roles);
          return (
            `<a class="${cls}" href="#${doc.id}" data-audience="${audience}" data-group="${doc.groupId}">` +
            `<span class="dot"></span>${escapeHtml(doc.title)}</a>` +
            `<div class="sub">${sub}</div>`
          );
        })
        .join('');
      return `<div class="group-label" data-group="${group.id}">${escapeHtml(group.label)}</div>${links}`;
    })
    .join('');
}

function renderRoles(manifest, docs) {
  const titleByPath = new Map(docs.map((doc) => [doc.path, doc]));
  return manifest.roles
    .map((role) => {
      const links = role.docs
        .map((path) => titleByPath.get(path))
        .filter(Boolean)
        .map((doc) => `<a href="#${doc.id}">${escapeHtml(doc.title)}</a>`)
        .join('');
      return (
        `<div class="role"><h3>${escapeHtml(role.label)}</h3>` +
        `<p>${escapeHtml(role.desc)}</p>${links}</div>`
      );
    })
    .join('');
}

function renderChips(doc) {
  const chips = [];
  if (doc.commit && doc.commit.hash) {
    chips.push(`<span class="chip mono">${escapeHtml(doc.commit.hash)}</span>`);
  }
  chips.push(`<span class="chip">최종 수정 ${formatDate(doc.commit && doc.commit.isoDate)}</span>`);
  if (doc.commit && doc.commit.author) {
    chips.push(`<span class="chip">${escapeHtml(doc.commit.author)}</span>`);
  }
  chips.push(`<span class="chip mono">${escapeHtml(doc.path)}</span>`);
  chips.push(`<span class="chip">${Math.round(doc.bytes / 1024)}KB</span>`);
  if (doc.staged) chips.push('<span class="chip staged">이번 커밋에서 수정됨</span>');
  return chips.join('');
}

function renderArticle(doc) {
  const summary = doc.note ? `<p class="summary">${escapeHtml(doc.note)}</p>` : '';
  return (
    `<article class="doc" id="${doc.id}" data-title="${escapeHtml(doc.title)}" data-group="${doc.groupId}">` +
    `<div class="doc-head"><h1>${escapeHtml(doc.title)}</h1>${summary}` +
    `<div class="chips">${renderChips(doc)}</div></div>` +
    `<div class="doc-body">${doc.html}</div></article>`
  );
}

function renderFilters(manifest) {
  const buttons = manifest.roles
    .map((role) => `<button data-role="${role.id}">${escapeHtml(role.label)}</button>`)
    .join('');
  return `<button class="on" data-role="all">전체</button>${buttons}`;
}

function renderPage(manifest, docs, headRef) {
  const stamp = headRef
    ? `${headRef.hash} · ${formatDate(headRef.isoDate)}`
    : '커밋 정보 없음';

  // Artifact 발행 시 문서 골격은 뷰어가 감싸므로 본문만 낸다.
  // charset만 명시해 두면 로컬 file:// 로 열 때도 한글이 깨지지 않는다.
  return `<meta charset="utf-8">
<title>${escapeHtml(manifest.title)}</title>
<style>${loadDesignTokens()}
${loadAsset('hub.css')}</style>
<div class="app">
<aside class="side">
  <div class="brand"><a href="#"><span class="name">${escapeHtml(manifest.title)}</span>
    <span class="meta">기준 커밋 ${escapeHtml(stamp)} · 문서 ${docs.length}개</span></a></div>
  <div class="search-box"><input id="search" type="search" placeholder="전체 문서 검색 (2자 이상)" autocomplete="off"></div>
  <div class="filters">${renderFilters(manifest)}</div>
  <nav class="nav">${renderNav(manifest, docs, headRef)}</nav>
  <div class="side-foot"><button class="theme-toggle" id="theme">라이트 / 다크 전환</button></div>
</aside>

<main>
  <div id="results" class="results"></div>
  <div class="cover" id="cover">
    <span class="eyebrow">PROJECT DOCUMENTATION</span>
    <h1>${escapeHtml(manifest.title)}</h1>
    <p class="sub">${escapeHtml(manifest.subtitle)}</p>
    <div class="roles">${renderRoles(manifest, docs)}</div>
  </div>
  ${docs.map(renderArticle).join('\n  ')}
</main>

<aside class="toc-col" id="toc"></aside>
</div>
<script>${loadAsset('hub.js')}</script>
`;
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
  const page = renderPage(manifest, docs, headRef);

  writeFileSync(OUTPUT, page, 'utf8');

  const bytes = Buffer.byteLength(page, 'utf8');
  const headings = docs.reduce((total, doc) => total + doc.headings.length, 0);
  console.log(`문서 ${docs.length}개 · 헤딩 ${headings}개 → ${basename(OUTPUT)} (${Math.round(bytes / 1024)}KB)`);
  docs.filter((doc) => doc.staged).forEach((doc) => console.log(`  이번 커밋에서 수정됨: ${doc.path}`));
  if (bytes > SIZE_WARN_BYTES) console.warn(`경고: 산출물이 ${Math.round(bytes / 1024)}KB 입니다.`);
}

build();
