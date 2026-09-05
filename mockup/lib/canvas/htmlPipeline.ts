import { createHash } from 'crypto';
import { parse, serialize, type DefaultTreeAdapterTypes } from 'parse5';

type Element = DefaultTreeAdapterTypes.Element;
type ChildNode = DefaultTreeAdapterTypes.ChildNode;
type ParentNode = DefaultTreeAdapterTypes.ParentNode;
type TextNode = DefaultTreeAdapterTypes.TextNode;

/** 요소를 재생성 이후에도 다시 찾아내기 위한 지문. screen_elements에 그대로 적재된다. */
export interface ElementFingerprint {
  nhId: string;
  tag: string;
  docOrder: number;
  /** 조상 태그 + 동일 태그 형제 인덱스. 구조가 유지되면 살아남는다. */
  pathSig: string;
  /** 직계 텍스트를 정규화한 값. 텍스트가 없는 컨테이너는 null. */
  textSig: string | null;
}

export interface PipelineResult {
  /** 정제 + data-nh-id 부여가 끝난 HTML. DB에 저장되는 형태이며 script를 포함하지 않는다. */
  html: string;
  elements: ElementFingerprint[];
  /** 제거한 항목과 끊어진 화면 링크. 화면에 경고로 노출할 수 있다. */
  warnings: string[];
}

export interface PipelineOptions {
  /**
   * data-goto가 가리킬 수 있는 화면 key 목록.
   * 여기 없는 값은 제거된다 — AI가 존재하지 않는 화면을 가리켜
   * "눌러도 아무 일이 없는 버튼"을 만드는 일이 잦기 때문이다.
   */
  knownScreenKeys: string[];
}

/** 통째로 걷어내는 태그. 내용까지 함께 사라진다. */
const DROP_TAGS = new Set([
  'script', 'iframe', 'object', 'embed', 'base', 'link', 'noscript',
  'template', 'applet', 'frame', 'frameset', 'foreignobject',
]);

/** 값이 URL로 해석되는 속성. 허용 형태가 아니면 속성을 지운다. */
const URL_ATTRS = new Set(['href', 'src', 'action', 'poster', 'background', 'data', 'srcset']);

/** 이름만으로 무조건 지우는 속성. on* 은 별도 정규식으로 함께 처리한다. */
const DROP_ATTRS = new Set([
  'srcdoc', 'ping', 'formaction', 'xlink:href',
  // AI가 붙인 식별자는 신뢰하지 않는다. 부여 권한은 이 파이프라인에만 있다.
  'data-nh-id',
]);

/** 주소를 지정할 이유가 없는 태그. ID를 부여하지 않는다. */
const NO_ID_TAGS = new Set([
  'html', 'head', 'meta', 'title', 'style', 'br', 'wbr', 'col', 'colgroup', 'source', 'track',
]);

const ALLOWED_DATA_IMAGE = /^data:image\/(png|jpe?g|gif|webp);base64,/i;

function isElement(node: ChildNode | ParentNode): node is Element {
  return typeof (node as Element).tagName === 'string';
}

function childrenOf(node: ParentNode): ChildNode[] {
  return node.childNodes ?? [];
}

function getAttr(el: Element, name: string): string | null {
  const a = el.attrs.find((x) => x.name === name);
  return a ? a.value : null;
}

function setAttr(el: Element, name: string, value: string) {
  const a = el.attrs.find((x) => x.name === name);
  if (a) a.value = value;
  else el.attrs.push({ name, value });
}

/**
 * 공백을 접고 숫자열을 #으로 치환한다.
 * 목업의 더미 데이터(금액·건수·날짜)는 재생성마다 달라지므로
 * 숫자를 지워야 같은 요소가 같은 키를 갖는다. 예: "12,400P" -> "#P"
 */
function normalizeText(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\d[\d,.\s]*/g, '#')
    .slice(0, 64);
}

/**
 * CSS 텍스트에서 외부 참조와 스크립트 실행 통로를 제거한다.
 * 선언 전체를 지우면 레이아웃이 무너지므로 값만 무력화한다.
 */
function sanitizeCss(css: string, warnings: string[]): string {
  const before = css;
  let out = css;

  out = out.replace(/@import[^;]*;?/gi, '');
  out = out.replace(/expression\s*\(/gi, 'void(');
  out = out.replace(/javascript\s*:/gi, '');
  // data:image 인라인만 남기고 나머지 url()은 none으로 바꾼다.
  out = out.replace(
    /url\(\s*(['"]?)([^)'"]*)\1\s*\)/gi,
    (whole: string, _quote: string, url: string) =>
      ALLOWED_DATA_IMAGE.test(url.trim()) ? whole : 'none'
  );

  if (out !== before) {
    warnings.push('CSS에서 외부 리소스 참조 또는 실행 가능한 표현식을 제거했습니다.');
  }
  return out;
}

/** 1단계: 신뢰할 수 없는 것을 제거한다. 가장 먼저 돌아야 한다. */
function sanitize(node: ParentNode, warnings: string[]) {
  const kept: ChildNode[] = [];

  for (const child of childrenOf(node)) {
    // 주석은 남길 이유가 없고 조건부 주석이라는 통로만 만든다.
    if (child.nodeName === '#comment') continue;

    if (!isElement(child)) {
      kept.push(child);
      continue;
    }

    const tag = child.tagName.toLowerCase();

    if (DROP_TAGS.has(tag)) {
      warnings.push(`<${tag}> 요소를 제거했습니다.`);
      continue;
    }
    // <meta http-equiv="refresh"> 같은 지시는 제거하되 charset meta는 남긴다.
    if (tag === 'meta' && getAttr(child, 'http-equiv') !== null) {
      warnings.push('<meta http-equiv> 를 제거했습니다.');
      continue;
    }

    child.attrs = child.attrs.filter((attr) => {
      const name = attr.name.toLowerCase();

      if (name.startsWith('on')) {
        warnings.push(`인라인 이벤트 핸들러 ${attr.name} 를 제거했습니다.`);
        return false;
      }
      if (DROP_ATTRS.has(name)) return false;

      if (URL_ATTRS.has(name)) {
        const value = attr.value.trim();
        if (!value.startsWith('#') && !ALLOWED_DATA_IMAGE.test(value)) {
          warnings.push(`${name}="${value.slice(0, 40)}" 를 제거했습니다 (허용되지 않는 URL).`);
          return false;
        }
      }
      if (name === 'style') {
        attr.value = sanitizeCss(attr.value, warnings);
      }
      return true;
    });

    if (tag === 'style') {
      for (const textNode of childrenOf(child)) {
        if (textNode.nodeName === '#text') {
          const t = textNode as TextNode;
          t.value = sanitizeCss(t.value, warnings);
        }
      }
    }

    sanitize(child, warnings);
    kept.push(child);
  }

  node.childNodes = kept;
}

/** 2단계: 존재하지 않는 화면을 가리키는 data-goto를 끊는다. */
function normalizeGoto(root: ParentNode, knownScreenKeys: string[], warnings: string[]) {
  for (const child of childrenOf(root)) {
    if (!isElement(child)) continue;

    const target = getAttr(child, 'data-goto');
    if (target !== null && !knownScreenKeys.includes(target)) {
      warnings.push(`data-goto="${target}" 는 존재하지 않는 화면이라 제거했습니다.`);
      child.attrs = child.attrs.filter((a) => a.name !== 'data-goto');
    }

    normalizeGoto(child, knownScreenKeys, warnings);
  }
}

/** 직계 텍스트 자식만 모은다. 자손 텍스트까지 끌어오면 컨테이너끼리 지문이 충돌한다. */
function directText(el: Element): string {
  return childrenOf(el)
    .filter((c): c is TextNode => c.nodeName === '#text')
    .map((t) => t.value)
    .join('');
}

/** 3단계: 안정적인 식별자를 부여하고 지문을 수집한다. */
function assignIds(root: ParentNode, elements: ElementFingerprint[]) {
  const used = new Set<string>();
  let order = 0;

  const walk = (node: ParentNode, path: string) => {
    const sameTagCount = new Map<string, number>();

    for (const child of childrenOf(node)) {
      if (!isElement(child)) continue;

      const tag = child.tagName.toLowerCase();
      const index = sameTagCount.get(tag) ?? 0;
      sameTagCount.set(tag, index + 1);

      const pathSig = path ? `${path}>${tag}:${index}` : `${tag}:${index}`;

      if (!NO_ID_TAGS.has(tag)) {
        const text = normalizeText(directText(child));
        const textSig = text.length > 0 ? text : null;
        // AI가 의미 키를 달아줬으면 그게 가장 안정적이다. 없으면 텍스트, 그것도 없으면 구조.
        const semanticKey = getAttr(child, 'data-nh-key') ?? textSig ?? pathSig;
        const role = getAttr(child, 'role') ?? '';

        const base = createHash('sha1')
          .update(`${tag}|${role}|${semanticKey}`)
          .digest('hex')
          .slice(0, 8);

        let nhId = base;
        let dup = 1;
        while (used.has(nhId)) nhId = `${base}-${dup++}`;
        used.add(nhId);

        setAttr(child, 'data-nh-id', nhId);
        elements.push({ nhId, tag, docOrder: order++, pathSig, textSig });
      }

      walk(child, pathSig);
    }
  };

  walk(root, '');
}

/**
 * 생성된 HTML을 저장 가능한 형태로 만든다.
 * parse5 파싱 1회 안에서 정제 -> data-goto 검증 -> ID 부여를 순서대로 수행한다.
 * 순서가 중요하다: 정제가 먼저 돌아야 제거될 요소에 ID를 낭비하지 않는다.
 *
 * 런타임 스크립트는 여기서 주입하지 않는다. 저장본을 script-free로 유지해야
 * HTML 다운로드가 안전하고, 런타임을 고쳐도 DB를 다시 쓸 필요가 없다.
 */
export function processGeneratedHtml(raw: string, opts: PipelineOptions): PipelineResult {
  const warnings: string[] = [];
  const doc = parse(raw);

  sanitize(doc, warnings);
  normalizeGoto(doc, opts.knownScreenKeys, warnings);

  const elements: ElementFingerprint[] = [];
  assignIds(doc, elements);

  return { html: serialize(doc), elements, warnings: [...new Set(warnings)] };
}
