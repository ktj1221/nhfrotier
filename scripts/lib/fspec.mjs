/**
 * 기능명세(FR-01~12)와 추적 매트릭스(00_INDEX)를 읽어 "기능 단위" 카드 데이터로 만든다.
 *
 * 정본은 어디까지나 md 문서다. 여기서 값을 새로 정의하지 않고 읽어서 대조만 한다.
 * 두 정본(매트릭스 / FR 파일)이 어긋나면 조용히 넘기지 않고 빌드를 실패시킨다.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const INDEX_PATH = '개발문서/기능명세/00_INDEX.md';

/**
 * FR ↔ 05_API_DB_SPEC 도메인 절 대응.
 * API 경로에서 절 이름을 유도할 수 없어 여기서 선언한다.
 * 절 이름이 바뀌면 앵커 해석 단계에서 빌드가 실패한다.
 */
const API_SECTION_BY_FR = {
  'FR-01': 'Auth',
  'FR-02': 'Project',
  'FR-03': 'Files',
  'FR-04': 'Template',
  'FR-05': 'AI Job',
  'FR-06': 'Collaboration',
  'FR-07': 'AI Review',
  'FR-08': 'AI Review',
  'FR-09': 'Version',
  'FR-10': 'History',
  'FR-11': 'Export',
  'FR-12': null,
};

/** FR 파일 경로는 매니페스트가 정본이므로 거기서 골라낸다. */
export function frPathsFrom(manifest) {
  return manifest.groups
    .flatMap((group) => group.docs)
    .map((doc) => doc.path)
    .filter((path) => /기능명세[\\/]FR-\d\d_/.test(path));
}

/* ── md 조각 파서 ── */

/** `## n. 제목` 단위로 문서를 자른다. 키는 번호를 뗀 제목이다. */
function splitSections(source) {
  const sections = new Map();
  let current = null;

  for (const line of source.replace(/\r\n?/g, '\n').split('\n')) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      current = { lines: [] };
      sections.set(heading[1].trim().replace(/^\d+\.\s*/, ''), current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  return sections;
}

function sectionLines(sections, name) {
  const section = sections.get(name);
  return section ? section.lines : [];
}

/** 헤더·구분선을 걷어내고 본문 행만 셀 배열로 돌려준다. */
function parseTable(lines) {
  const rows = [];
  let seenDivider = false;

  for (const line of lines) {
    if (!/^\s*\|.*\|\s*$/.test(line)) continue;
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) {
      seenDivider = true;
      continue;
    }
    if (!seenDivider) continue;
    rows.push(
      line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
    );
  }
  return rows;
}

/** 표시용 평문. 링크·강조·코드 표기를 벗긴다. */
export function plain(text) {
  return String(text)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*`~]/g, '')
    .trim();
}

/**
 * `US-020·021`, `FE-002·003, BE-002` 처럼 접두사를 생략한 나열을 완전한 ID로 펼친다.
 * 숫자만 남은 토큰은 직전 접두사를 물려받는다.
 */
function expandCodes(cell) {
  const codes = [];
  let prefix = null;

  for (const token of plain(cell).split(/[,·、\s]+/)) {
    const full = token.match(/^([A-Za-z]+)-(\d+)$/);
    if (full) {
      prefix = full[1].toUpperCase();
      codes.push(prefix + '-' + full[2]);
      continue;
    }
    const bare = token.match(/^(\d+)$/);
    if (bare && prefix) codes.push(prefix + '-' + bare[1]);
  }
  return codes.filter((code, i, all) => all.indexOf(code) === i);
}

/** `S01·S02·S03`, `S03 진입`, `공통 (❓ ...)` 에서 화면 코드만 추린다. */
function screenCodes(cell) {
  return (plain(cell).match(/S\d\d/g) || []).filter((code, i, all) => all.indexOf(code) === i);
}

/** 구현 상태 3단계를 색·필터에 쓸 수 있는 등급으로 정규화한다. */
function statusLevel(text) {
  const value = plain(text);
  if (value.includes('✅')) return 'done';
  if (value.includes('부분')) return 'partial';
  return 'todo';
}

/* ── 추적 매트릭스 ── */

function parseIndexMatrix(root) {
  const source = readFileSync(join(root, INDEX_PATH), 'utf8');
  const rows = parseTable(sectionLines(splitSections(source), '추적 매트릭스'));
  const byId = new Map();

  for (const cells of rows) {
    const label = plain(cells[0]);
    const id = (label.match(/^FR-\d\d/) || [])[0];
    if (!id) continue;

    const tickets = expandCodes(cells[6]);
    byId.set(id, {
      id,
      name: label.replace(/^FR-\d\d\s*/, ''),
      us: expandCodes(cells[2]),
      screens: screenCodes(cells[3]),
      screenNote: plain(cells[3]),
      apiNote: plain(cells[4]),
      phases: plain(cells[5]).match(/P\d/g) || [],
      tickets,
      areas: tickets
        .map((code) => code.split('-')[0])
        .filter((area, i, all) => all.indexOf(area) === i),
    });
  }
  return byId;
}

/* ── FR 상세 명세 ── */

function parseFrFile(root, path) {
  const source = readFileSync(join(root, path), 'utf8');
  const sections = splitSections(source);
  const heading = source.match(/^#\s+(FR-\d\d)\s+(.*?)(?:\s+v[\d.]+)?\s*$/m);
  if (!heading) throw new Error(`${path}: 첫 줄에서 FR 번호를 읽지 못했습니다.`);

  const overview = sectionLines(sections, '개요')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('>'));
  const detail = sectionLines(sections, '동작 상세');

  return {
    id: heading[1],
    name: heading[2].trim(),
    path,
    summary: plain(overview[0] || ''),
    details: detail
      .filter((line) => /^\s*[-*]\s+/.test(line))
      .map((line) => plain(line.replace(/^\s*[-*]\s+/, ''))),
    screens: parseTable(sectionLines(sections, '관련 화면')).map((cells) => ({
      label: plain(cells[0]),
      code: (plain(cells[0]).match(/S\d\d/) || [])[0] || null,
      role: plain(cells[1] || ''),
    })),
    apis: parseTable(sectionLines(sections, '관련 API')).map((cells) => ({
      method: plain(cells[0]),
      path: plain(cells[1] || ''),
      purpose: plain(cells[2] || ''),
    })),
    us: parseTable(sectionLines(sections, 'US 매핑')).map((cells) => ({
      id: (plain(cells[0]).match(/US-\d+/) || [])[0] || plain(cells[0]),
      gist: plain(cells[1] || ''),
      ac: plain(cells[2] || ''),
    })),
    stages: parseTable(sectionLines(sections, '구현 상태')).map((cells) => ({
      stage: plain(cells[0]),
      state: plain(cells[1] || ''),
      level: statusLevel(cells[1] || ''),
      note: plain(cells[2] || ''),
    })),
    openIssues: detail
      .filter((line) => line.includes('❓'))
      .map((line) => plain(line.replace(/^\s*[-*]\s+/, ''))),
  };
}

/* ── 대조 ── */

/** 매트릭스와 FR 파일이 어긋나면 여기서 잡는다. 어느 쪽이 맞는지는 사람이 판단해야 한다. */
function crossCheck(feature) {
  const problems = [];

  const compare = (label, fromFile, fromIndex) => {
    const a = [...fromFile].sort().join(' ');
    const b = [...fromIndex].sort().join(' ');
    if (a !== b) {
      problems.push(
        `${feature.id}: ${label} 불일치 — 매트릭스 [${b || '없음'}] / ${feature.path} [${a || '없음'}]`
      );
    }
  };

  compare('US 매핑', feature.us.map((item) => item.id), feature.index.us);
  compare('화면', feature.screens.map((item) => item.code).filter(Boolean), feature.index.screens);

  if (feature.name !== feature.index.name) {
    problems.push(
      `${feature.id}: 기능명 불일치 — 매트릭스 "${feature.index.name}" / ${feature.path} "${feature.name}"`
    );
  }
  return problems;
}

export function collectFeatures(root, manifest) {
  const matrix = parseIndexMatrix(root);
  const paths = frPathsFrom(manifest);
  if (paths.length === 0) throw new Error('매니페스트에 기능명세(FR) 문서가 없습니다.');

  const problems = [];
  const features = paths
    .map((path) => {
      const spec = parseFrFile(root, path);
      const index = matrix.get(spec.id);
      if (!index) throw new Error(`${path}: ${INDEX_PATH} 추적 매트릭스에 ${spec.id} 행이 없습니다.`);
      return { ...spec, index, apiSection: API_SECTION_BY_FR[spec.id] || null };
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  for (const id of matrix.keys()) {
    if (!features.some((feature) => feature.id === id)) {
      problems.push(`${id}: 매트릭스에는 있으나 상세 명세 파일이 매니페스트에 없습니다.`);
    }
  }
  features.forEach((feature) => problems.push(...crossCheck(feature)));

  if (problems.length > 0) {
    throw new Error('기능명세와 추적 매트릭스가 어긋납니다:\n  - ' + problems.join('\n  - '));
  }
  return features;
}
