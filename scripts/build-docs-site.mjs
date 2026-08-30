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
import { collectFeatures } from './lib/fspec.mjs';

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

/* ── 기능(FR) 단위 뷰 ── */

/** 카드에 쓰는 짧은 이름. 정식 명칭은 FR 문서 6절 표가 정본이므로 title 속성으로 남긴다. */
const STAGE_LABELS = ['설계', '프로토타입', '운영'];
const AREA_LABELS = { FE: 'FE', BE: 'BE', OPS: 'Infra/DevOps' };

const startsWith = (prefix) => (text) => text.startsWith(prefix);
const equals = (value) => (text) => text === value;

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

/** 기능 하나에 딸린 정본 위치를 모은다. 문서를 순회하지 않고 한 기능을 끝까지 보게 하는 것이 목적이다. */
function buildFeatureLinks(feature, finder) {
  const groups = [];
  const push = (key, links) => {
    const live = links.filter(Boolean);
    if (live.length > 0) groups.push({ key, links: live });
  };
  const link = (hit, label) => hit && { href: hit.href, label: label || hit.text };

  push('제품 요구', [
    link(finder.find('01_PRD', startsWith(feature.id), `${feature.id} 요구사항 절`), null),
  ]);

  push(
    '유저스토리',
    feature.us.map((item) =>
      link(finder.find('02_USER_STORIES_AC', startsWith(item.id), item.id))
    )
  );

  push(
    '화면',
    feature.screens
      .filter((screen) => screen.code)
      .map((screen) =>
        link(finder.find('03_IA_FUNCTION_SPEC', startsWith(screen.code), screen.code))
      )
  );

  if (feature.apiSection) {
    push('API', [
      link(finder.find('05_API_DB_SPEC', equals(feature.apiSection), feature.apiSection)),
    ]);
  }

  push('백로그', [
    ...feature.index.phases.map((phase) =>
      link(finder.find('06_DEVELOPMENT_BACKLOG', startsWith(phase + '.'), phase))
    ),
    ...feature.index.areas.map((area) => {
      const title = AREA_LABELS[area] || area;
      const tickets = feature.index.tickets.filter((code) => code.startsWith(area + '-'));
      return link(
        finder.find('06_DEVELOPMENT_BACKLOG', equals(title), `${title} 티켓 목록`),
        `${title} — ${tickets.join(' · ')}`
      );
    }),
  ]);

  if (feature.openIssues.length > 0) {
    push('미결', [
      link(
        finder.find('08_DECISIONS_OPEN_ISSUES', startsWith('2.'), '협의 필요 항목'),
        `08 · 협의 필요 항목 ${feature.openIssues.length}건`
      ),
    ]);
  }
  return groups;
}

function renderStages(feature) {
  return feature.stages
    .map((stage, i) => {
      const label = STAGE_LABELS[i] || stage.stage;
      // 6절 표의 상태 칸은 `— 미검증`처럼 대시로 시작하기도 한다. 구분자와 겹쳐 보이지 않게 턴다.
      const title = `${stage.stage} — ${stage.state.replace(/^[—-]\s*/, '')}`;
      return `<span class="st ${stage.level}" title="${escapeHtml(title)}">${escapeHtml(label)}</span>`;
    })
    .join('');
}

function renderFeatureCard(feature) {
  const meta = [
    ['US', feature.index.us.join(' · ')],
    ['화면', feature.index.screenNote],
    ['API', feature.index.apiNote],
    ['티켓', feature.index.tickets.join(' · ')],
  ]
    .filter(([, value]) => value)
    .map(([key, value]) => `<span class="fm"><b>${key}</b>${escapeHtml(value)}</span>`)
    .join('');

  const protoLevel = (feature.stages[1] || {}).level || 'todo';
  const open = feature.openIssues.length;
  const phases = feature.index.phases.join(' ');

  return (
    `<a class="fcard" href="#${feature.docId}"` +
    ` data-phases="${escapeHtml(phases)}" data-areas="${escapeHtml(feature.index.areas.join(' '))}"` +
    ` data-proto="${protoLevel}" data-open="${open}">` +
    `<div class="fcard-top"><span class="fid">${escapeHtml(feature.id)}</span>` +
    (phases ? `<span class="fphase">${escapeHtml(phases.split(' ').join('·'))}</span>` : '') +
    (open ? `<span class="fopen" title="미결 ${open}건">❓ ${open}</span>` : '') +
    `</div>` +
    `<h3>${escapeHtml(feature.name)}</h3>` +
    `<p>${escapeHtml(feature.summary)}</p>` +
    `<div class="fmeta">${meta}</div>` +
    `<div class="fstages">${renderStages(feature)}</div></a>`
  );
}

/** 대시보드 필터. 값은 실제 데이터에서 뽑아 쓰지 않는 필터가 남지 않게 한다. */
function renderBoardFilters(features) {
  const phases = [...new Set(features.flatMap((feature) => feature.index.phases))].sort();
  const areas = [...new Set(features.flatMap((feature) => feature.index.areas))].sort();

  const group = (key, label, values) =>
    `<div class="fgroup"><span class="fgroup-k">${escapeHtml(label)}</span>` +
    `<button class="on" data-dim="${key}" data-value="all">전체</button>` +
    values
      .map(
        ([value, text]) =>
          `<button data-dim="${key}" data-value="${escapeHtml(value)}">${escapeHtml(text)}</button>`
      )
      .join('') +
    `</div>`;

  return (
    group('phase', '개발 단계', phases.map((phase) => [phase, phase])) +
    group('proto', '프로토타입', [
      ['partial', '부분 검증'],
      ['todo', '미검증'],
    ]) +
    group('area', '영역', areas.map((area) => [area, AREA_LABELS[area] || area])) +
    `<div class="fgroup"><button data-dim="open" data-value="only">❓ 미결 있는 기능만</button></div>`
  );
}

function renderBoard(features) {
  const counts = features.reduce(
    (acc, feature) => {
      acc.open += feature.openIssues.length;
      if ((feature.stages[1] || {}).level === 'partial') acc.proto += 1;
      return acc;
    },
    { open: 0, proto: 0 }
  );

  return (
    `<section class="board" data-group="feature">` +
    `<div class="board-head"><h2>기능 단위 개발 요건</h2>` +
    `<p>기능 ${features.length}개 · 프로토타입 부분 검증 ${counts.proto}개 · 운영 구현 0개 · 미결 ${counts.open}건</p></div>` +
    `<div class="board-filters">${renderBoardFilters(features)}</div>` +
    `<div class="fgrid">${features.map(renderFeatureCard).join('')}</div>` +
    `<p class="board-foot">카드를 누르면 해당 기능의 상세 명세로 이동합니다. 수치는 ` +
    `<code>개발문서/기능명세/</code>에서 빌드할 때 읽어 옵니다.</p>` +
    `</section>`
  );
}

/** FR 문서 본문 위에 붙는 "이 기능 관련 정본" 링크 띠. */
function renderRail(feature) {
  const groups = feature.links
    .map(
      (group) =>
        `<div class="rail-g"><span class="rail-k">${escapeHtml(group.key)}</span>` +
        group.links
          .map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
          .join('') +
        `</div>`
    )
    .join('');

  return (
    `<div class="rail"><div class="rail-title">이 기능 관련 정본` +
    `<span class="rail-stages">${renderStages(feature)}</span></div>` +
    `<div class="rail-groups">${groups}</div></div>`
  );
}

/* ── 마크업 조립 ── */

/** 사이드바 최상단 기능 그룹. 문서 묶음보다 기능이 먼저 보이게 한다. */
function renderFeatureNav(features) {
  const links = features
    .map(
      (feature) =>
        // 기능 단위 진행 상황은 기획도 본다. 대상자 필터로 이 그룹이 흐려지지 않게 둘 다 준다.
        `<a class="doc-link feat" href="#${feature.docId}" data-audience="pm dev" data-group="feature">` +
        `<span class="fnav-id">${escapeHtml(feature.id)}</span>` +
        `<span class="fnav-name">${escapeHtml(feature.name)}</span>` +
        `<span class="fnav-st">${renderStages(feature)}</span></a>`
    )
    .join('');
  return `<div class="group-label" data-group="feature">기능 (개발 요건)</div>${links}`;
}

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

/** 레일은 `.doc-body` 바깥에 둔다 — 검색 색인과 우측 목차가 본문만 보도록 하기 위해서다. */
function renderArticle(doc, featureByDocId) {
  const summary = doc.note ? `<p class="summary">${escapeHtml(doc.note)}</p>` : '';
  const feature = featureByDocId.get(doc.id);
  return (
    `<article class="doc" id="${doc.id}" data-title="${escapeHtml(doc.title)}" data-group="${doc.groupId}">` +
    `<div class="doc-head"><h1>${escapeHtml(doc.title)}</h1>${summary}` +
    `<div class="chips">${renderChips(doc)}</div></div>` +
    (feature ? renderRail(feature) : '') +
    `<div class="doc-body">${doc.html}</div></article>`
  );
}

function renderFilters(manifest) {
  const buttons = manifest.roles
    .map((role) => `<button data-role="${role.id}">${escapeHtml(role.label)}</button>`)
    .join('');
  return `<button class="on" data-role="all">전체</button>${buttons}`;
}

function renderPage(manifest, docs, headRef, features) {
  const featureByDocId = new Map(features.map((feature) => [feature.docId, feature]));
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
  <nav class="nav">${renderFeatureNav(features)}${renderNav(manifest, docs, headRef)}</nav>
  <div class="side-foot"><button class="theme-toggle" id="theme">라이트 / 다크 전환</button></div>
</aside>

<main>
  <div id="results" class="results"></div>
  <div class="cover" id="cover">
    <span class="eyebrow">PROJECT DOCUMENTATION</span>
    <h1>${escapeHtml(manifest.title)}</h1>
    <p class="sub">${escapeHtml(manifest.subtitle)}</p>
    ${renderBoard(features)}
    <div class="roles compact">${renderRoles(manifest, docs)}</div>
  </div>
  ${docs.map((doc) => renderArticle(doc, featureByDocId)).join('\n  ')}
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

  const finder = anchorFinder(docs);
  const features = collectFeatures(ROOT, manifest).map((feature) => {
    const docId = toDocId(feature.path);
    return { ...feature, docId, links: buildFeatureLinks(feature, finder) };
  });

  const page = renderPage(manifest, docs, headRef, features);

  writeFileSync(OUTPUT, page, 'utf8');
  finder.missing.forEach((item) => console.warn(`경고: 앵커를 찾지 못했습니다 — ${item}`));

  const bytes = Buffer.byteLength(page, 'utf8');
  const headings = docs.reduce((total, doc) => total + doc.headings.length, 0);
  console.log(`문서 ${docs.length}개 · 헤딩 ${headings}개 → ${basename(OUTPUT)} (${Math.round(bytes / 1024)}KB)`);
  docs.filter((doc) => doc.staged).forEach((doc) => console.log(`  이번 커밋에서 수정됨: ${doc.path}`));
  if (bytes > SIZE_WARN_BYTES) console.warn(`경고: 산출물이 ${Math.round(bytes / 1024)}KB 입니다.`);
}

build();
