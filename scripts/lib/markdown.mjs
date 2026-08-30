/**
 * 이 프로젝트 문서에서 실제로 쓰이는 마크다운 구문만 다루는 최소 렌더러.
 * 지원: h1~h3, 불릿/순서/중첩 리스트, 체크박스, 테이블, 코드펜스,
 *       인용, 수평선, 볼드, 취소선, 인라인 코드, 링크
 */

const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

/** 인라인 코드 스팬을 기준으로 문자열을 분할한다. 코드 안의 특수문자는 치환 대상에서 제외된다. */
function splitCodeSpans(text) {
  const parts = [];
  let buffer = '';
  let inCode = false;

  for (const ch of text) {
    if (ch === '`') {
      parts.push({ code: inCode, text: buffer });
      buffer = '';
      inCode = !inCode;
      continue;
    }
    buffer += ch;
  }
  parts.push({ code: false, text: inCode ? '`' + buffer : buffer });
  return parts.filter((part) => part.text !== '');
}

/** `javascript:` 등 위험한 스킴을 막고, 문서 간 상호 링크는 페이지 내 앵커로 바꾼다. */
function resolveHref(rawHref, docIdByPath) {
  const href = rawHref.trim();
  if (href.startsWith('#')) return { href, external: false };
  if (/^https?:\/\//i.test(href)) return { href, external: true };

  const docId = docIdByPath.get(href.replace(/^\.\//, ''));
  if (docId) return { href: '#' + docId, external: false };

  return null;
}

function applyEmphasis(escaped, docIdByPath) {
  return escaped
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (whole, label, rawHref) => {
      const link = resolveHref(rawHref, docIdByPath);
      if (!link) return label;
      const attrs = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a href="' + escapeHtml(link.href) + '"' + attrs + '>' + label + '</a>';
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>');
}

export function renderInline(text, docIdByPath) {
  return splitCodeSpans(text)
    .map((part) =>
      part.code
        ? '<code>' + escapeHtml(part.text) + '</code>'
        : applyEmphasis(escapeHtml(part.text), docIdByPath)
    )
    .join('');
}

/** 코드 스팬 안의 파이프를 셀 구분자로 오인하지 않도록 행을 분할한다. */
function splitTableRow(line) {
  const body = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let buffer = '';
  let inCode = false;

  for (const ch of body) {
    if (ch === '`') inCode = !inCode;
    if (ch === '|' && !inCode) {
      cells.push(buffer);
      buffer = '';
      continue;
    }
    buffer += ch;
  }
  cells.push(buffer);
  return cells.map((cell) => cell.trim());
}

const isTableRow = (line) => /^\s*\|.*\|\s*$/.test(line);
const isTableDivider = (line) => /^\s*\|[\s:|-]+\|\s*$/.test(line);
const isListItem = (line) => /^(\s*)([-*]|\d+\.)\s+/.test(line);
const isHeading = (line) => /^#{1,6}\s+/.test(line);
const isHorizontalRule = (line) => /^(-{3,}|\*{3,}|_{3,})\s*$/.test(line);

function renderCell(text, tag, ctx) {
  return '<' + tag + '>' + renderInline(text, ctx.docIdByPath) + '</' + tag + '>';
}

function takeTable(lines, start, ctx) {
  const header = splitTableRow(lines[start]);
  let cursor = start + 2;
  const rows = [];

  while (cursor < lines.length && isTableRow(lines[cursor])) {
    rows.push(splitTableRow(lines[cursor]));
    cursor += 1;
  }

  const head = '<thead><tr>' + header.map((c) => renderCell(c, 'th', ctx)).join('') + '</tr></thead>';
  const body = rows
    .map((row) => '<tr>' + row.map((c) => renderCell(c, 'td', ctx)).join('') + '</tr>')
    .join('');
  return {
    html: '<div class="table-wrap"><table>' + head + '<tbody>' + body + '</tbody></table></div>',
    next: cursor,
  };
}

/**
 * mermaid 블록은 Artifact 뷰어가 `pre.mermaid`를 네이티브 렌더하므로 그대로 넘긴다.
 * 엔티티는 브라우저가 textContent로 되돌리므로 이스케이프해도 다이어그램이 깨지지 않는다.
 */
function takeFence(lines, start) {
  const language = lines[start].slice(3).trim();
  let cursor = start + 1;
  const body = [];

  while (cursor < lines.length && !lines[cursor].startsWith('```')) {
    body.push(lines[cursor]);
    cursor += 1;
  }

  const code = escapeHtml(body.join('\n'));
  const next = cursor + 1;

  if (language === 'mermaid') {
    return { html: '<pre class="mermaid">' + code + '</pre>', next };
  }

  const cls = language ? ' class="lang-' + escapeHtml(language) + '"' : '';
  return { html: '<pre><code' + cls + '>' + code + '</code></pre>', next };
}

function renderItemText(text, ctx) {
  const checkbox = text.match(/^\[([ xX])\]\s+(.*)$/);
  if (!checkbox) return renderInline(text, ctx.docIdByPath);

  const checked = checkbox[1].toLowerCase() === 'x';
  const mark = '<span class="chk' + (checked ? ' on' : '') + '">' + (checked ? '☑' : '☐') + '</span>';
  return mark + renderInline(checkbox[2], ctx.docIdByPath);
}

function collectListItems(lines, start) {
  const items = [];
  let cursor = start;

  while (cursor < lines.length) {
    const match = lines[cursor].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (!match) break;
    items.push({ indent: match[1].length, ordered: /\d/.test(match[2]), text: match[3] });
    cursor += 1;
  }
  return { items, next: cursor };
}

function buildList(items, cursor, indent, ctx) {
  const tag = items[cursor.i].ordered ? 'ol' : 'ul';
  let html = '<' + tag + '>';

  while (cursor.i < items.length && items[cursor.i].indent >= indent) {
    const item = items[cursor.i];
    cursor.i += 1;
    html += '<li>' + renderItemText(item.text, ctx);
    if (cursor.i < items.length && items[cursor.i].indent > indent) {
      html += buildList(items, cursor, items[cursor.i].indent, ctx);
    }
    html += '</li>';
  }
  return html + '</' + tag + '>';
}

function takeList(lines, start, ctx) {
  const { items, next } = collectListItems(lines, start);
  return { html: buildList(items, { i: 0 }, items[0].indent, ctx), next };
}

function takeQuote(lines, start, ctx) {
  const body = [];
  let cursor = start;

  while (cursor < lines.length && /^>\s?/.test(lines[cursor])) {
    body.push(lines[cursor].replace(/^>\s?/, ''));
    cursor += 1;
  }
  return { html: '<blockquote>' + renderBlocks(body, ctx) + '</blockquote>', next: cursor };
}

function takeHeading(lines, start, ctx) {
  const match = lines[start].match(/^(#{1,6})\s+(.*)$/);
  const level = Math.min(match[1].length, 3);
  const id = ctx.docId + '-h' + ctx.headings.length;
  const text = match[2].trim();

  ctx.headings.push({ id, level, text });
  return {
    html: '<h' + level + ' id="' + id + '">' + renderInline(text, ctx.docIdByPath) + '</h' + level + '>',
    next: start + 1,
  };
}

/** 원문에서 줄을 나눠 쓴 의도를 살리기 위해 문단 내 줄바꿈을 br로 유지한다. */
function takeParagraph(lines, start, ctx) {
  const body = [];
  let cursor = start;

  while (cursor < lines.length && lines[cursor].trim() !== '') {
    const line = lines[cursor];
    if (isHeading(line) || isListItem(line) || isTableRow(line) || isHorizontalRule(line)) break;
    if (line.startsWith('```') || line.startsWith('>')) break;
    body.push(renderInline(line.trim(), ctx.docIdByPath));
    cursor += 1;
  }

  if (body.length === 0) return { html: '', next: start + 1 };
  return { html: '<p>' + body.join('<br>') + '</p>', next: cursor };
}

function takeBlock(lines, cursor, ctx) {
  const line = lines[cursor];

  if (line.trim() === '') return { html: '', next: cursor + 1 };
  if (line.startsWith('```')) return takeFence(lines, cursor);
  if (isHeading(line)) return takeHeading(lines, cursor, ctx);
  if (isHorizontalRule(line)) return { html: '<hr>', next: cursor + 1 };
  if (line.startsWith('>')) return takeQuote(lines, cursor, ctx);
  if (isTableRow(line) && isTableDivider(lines[cursor + 1] || '')) return takeTable(lines, cursor, ctx);
  if (isListItem(line)) return takeList(lines, cursor, ctx);
  return takeParagraph(lines, cursor, ctx);
}

export function renderBlocks(lines, ctx) {
  let html = '';
  let cursor = 0;

  while (cursor < lines.length) {
    const block = takeBlock(lines, cursor, ctx);
    html += block.html;
    cursor = block.next > cursor ? block.next : cursor + 1;
  }
  return html;
}

export function renderMarkdown(source, docId, docIdByPath) {
  const ctx = { docId, docIdByPath, headings: [] };
  const html = renderBlocks(source.replace(/\r\n?/g, '\n').split('\n'), ctx);
  return { html, headings: ctx.headings };
}
