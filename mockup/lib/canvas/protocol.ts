/**
 * 부모 페이지와 목업 iframe 사이의 메시지 규약.
 *
 * iframe은 sandbox="allow-scripts"로만 띄운다. allow-same-origin을 함께 주지 않으므로
 * 프레임은 불투명(opaque) 오리진이 되고, 프레임 안의 코드는 부모 DOM·쿠키·스토리지에
 * 접근할 수 없다. 그 대가로 통신 수단이 postMessage 하나뿐이다.
 */

export const CANVAS_PROTOCOL = 'canvas/1' as const;

interface Envelope {
  __nh: typeof CANVAS_PROTOCOL;
  nonce: string;
}

/** 문서 좌표계. iframe이 내부 스크롤을 하지 않으므로 부모 오버레이 좌표와 그대로 맞는다. */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** 속성 패널이 실제로 편집할 수 있는 CSS 속성만 노출한다. */
export const EDITABLE_STYLE_PROPS = [
  'color',
  'background-color',
  'font-size',
  'font-weight',
  'text-align',
  'border-radius',
  'border-color',
  'padding',
  'margin',
  'opacity',
  'display',
] as const;

/**
 * setAttr로 바꿀 수 있는 속성.
 * href·src는 의도적으로 제외한다 — 허용하면 패치가 정제(sanitize)를 우회하는 통로가 된다.
 */
export const EDITABLE_ATTRS = ['placeholder', 'alt', 'title', 'aria-label', 'data-goto'] as const;

export type EditableStyleProp = (typeof EDITABLE_STYLE_PROPS)[number];
export type EditableAttr = (typeof EDITABLE_ATTRS)[number];

export interface ElementMeta {
  nhId: string;
  tag: string;
  /** 직계 텍스트만. 200자에서 자른다. */
  text: string | null;
  /** 화이트리스트된 속성만 담는다. */
  attrs: Record<string, string>;
  /** getComputedStyle 결과 중 EDITABLE_STYLE_PROPS에 해당하는 값. */
  computed: Record<string, string>;
  rect: Rect;
}

export type PatchOp =
  | { nhId: string; kind: 'text'; value: string }
  | { nhId: string; kind: 'style'; prop: EditableStyleProp; value: string }
  | { nhId: string; kind: 'attr'; name: EditableAttr; value: string }
  /** 요소를 AI가 다시 만든 HTML로 교체한다. 서버에서 정제를 마친 값만 들어온다. */
  | { nhId: string; kind: 'replace'; html: string };

/** iframe -> 부모. 봉투를 뺀 알맹이. */
export type FromFramePayload =
  | { type: 'ready'; screenKey: string; docHeight: number; elementCount: number }
  /** meta가 null이면 빈 곳을 눌러 선택을 해제한 것이다. */
  | { type: 'select'; meta: ElementMeta | null }
  | { type: 'hover'; nhId: string | null }
  | { type: 'navigate'; toScreenKey: string; fromNhId: string }
  | { type: 'rects'; items: Array<{ nhId: string; rect: Rect }> }
  | { type: 'resize'; docHeight: number }
  | { type: 'error'; message: string };

export type FromFrame = Envelope & FromFramePayload;

/**
 * 부모 -> iframe. 봉투를 뺀 알맹이.
 *
 * 불투명 오리진에는 targetOrigin을 지정할 수 없어 '*'로 보낼 수밖에 없다.
 * 따라서 이 방향의 페이로드에는 userId·세션·토큰·다른 프로젝트 정보를 절대 넣지 않는다.
 * 화면에 그리기 위한 표현 데이터만 보낸다.
 */
export type ToFramePayload =
  | { type: 'setMode'; mode: CanvasMode }
  | { type: 'highlight'; nhIds: string[] }
  | { type: 'applyPatch'; ops: PatchOp[] }
  | { type: 'requestRects'; nhIds: string[] }
  | { type: 'scrollTo'; nhId: string };

export type ToFrame = Envelope & ToFramePayload;

/** select = 요소를 고르는 모드. preview = 목업을 실제처럼 눌러보는 모드. */
export type CanvasMode = 'select' | 'preview';

/**
 * 프레임에서 온 메시지인지 검증한다.
 *
 * event.origin은 쓸 수 없다 — 불투명 오리진에서는 항상 문자열 "null"이고
 * 모든 불투명 오리진이 같은 값을 내므로 정보량이 0이다.
 * 실제 보안 경계는 event.source 대조다. 이 값은 브라우저가 채우며 위조할 수 없다.
 *
 * nonce는 보안 장치가 아니라 세대(generation) 구분용이다.
 * srcDoc을 교체하면 언로드 직전의 낡은 문서가 메시지를 한 번 더 쏠 수 있는데,
 * 그때 contentWindow가 아직 같은 객체일 수 있어 source 대조만으로는 걸러지지 않는다.
 */
export function isTrustedFrameMessage(
  event: MessageEvent,
  frame: HTMLIFrameElement | null,
  nonce: string
): event is MessageEvent<FromFrame> {
  if (!frame || event.source !== frame.contentWindow) return false;

  const data = event.data as Partial<FromFrame> | null;
  if (typeof data !== 'object' || data === null) return false;
  if (data.__nh !== CANVAS_PROTOCOL) return false;
  if (data.nonce !== nonce) return false;
  return typeof data.type === 'string';
}
