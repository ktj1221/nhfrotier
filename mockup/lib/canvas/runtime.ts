import { CANVAS_PROTOCOL, EDITABLE_ATTRS, EDITABLE_STYLE_PROPS } from './protocol';

/**
 * 목업 iframe 안에서 실행되는 스크립트.
 *
 * 이것은 AI 생성물이 아니라 우리가 통제하는 코드다. 그래서 DB에 저장하지 않고
 * srcDoc을 조립하는 순간에만 끼워 넣는다 — 저장본은 script-free로 유지된다.
 *
 * 프레임은 불투명 오리진이므로 document.cookie / localStorage / sessionStorage /
 * parent.document 접근은 전부 SecurityError를 던진다. 그래서 아예 쓰지 않는다.
 */
export function buildRuntime(nonce: string, screenKey: string): string {
  const config = JSON.stringify({
    nonce,
    screenKey,
    proto: CANVAS_PROTOCOL,
    styleProps: EDITABLE_STYLE_PROPS,
    attrs: EDITABLE_ATTRS,
  });

  // 아래는 iframe 안에서 그대로 평가되는 소스다.
  // 부모 번들의 스코프를 참조할 수 없으므로 설정은 위 JSON으로만 전달한다.
  return `(function () {
  'use strict';

  var CFG = ${config};
  var HOVER = 'data-nh-hover';
  var SELECTED = 'data-nh-selected';
  var mode = 'select';

  function send(msg) {
    msg.__nh = CFG.proto;
    msg.nonce = CFG.nonce;
    // 불투명 오리진이라 targetOrigin을 특정할 수 없다. 그래서 이 방향으로는
    // 화면 표현에 필요한 값만 올려보낸다.
    parent.postMessage(msg, '*');
  }

  var style = document.createElement('style');
  style.setAttribute('data-nh-runtime', '1');
  style.textContent =
    '[' + HOVER + ']{outline:2px solid #6366f1;outline-offset:-2px;cursor:pointer}' +
    '[' + SELECTED + ']{outline:2px solid #4338ca;outline-offset:-2px}' +
    '[data-nh-goto-hint]{position:relative}';
  document.head.appendChild(style);

  function target(node) {
    if (!node || !node.closest) return null;
    return node.closest('[data-nh-id]');
  }

  function docRect(el) {
    var r = el.getBoundingClientRect();
    return {
      x: r.left + window.scrollX,
      y: r.top + window.scrollY,
      w: r.width,
      h: r.height
    };
  }

  function metaOf(el) {
    var attrs = {};
    for (var i = 0; i < CFG.attrs.length; i++) {
      var name = CFG.attrs[i];
      if (el.hasAttribute(name)) attrs[name] = el.getAttribute(name);
    }
    if (el.hasAttribute('type')) attrs.type = el.getAttribute('type');

    var cs = window.getComputedStyle(el);
    var computed = {};
    for (var j = 0; j < CFG.styleProps.length; j++) {
      var prop = CFG.styleProps[j];
      computed[prop] = cs.getPropertyValue(prop);
    }

    var text = '';
    for (var k = 0; k < el.childNodes.length; k++) {
      var n = el.childNodes[k];
      if (n.nodeType === 3) text += n.nodeValue;
    }
    text = text.replace(/\\s+/g, ' ').trim();

    return {
      nhId: el.getAttribute('data-nh-id'),
      tag: el.tagName.toLowerCase(),
      text: text.length ? text.slice(0, 200) : null,
      attrs: attrs,
      computed: computed,
      rect: docRect(el)
    };
  }

  var hovered = null;
  document.addEventListener('mousemove', function (e) {
    if (mode !== 'select') return;
    var el = target(e.target);
    if (el === hovered) return;
    if (hovered) hovered.removeAttribute(HOVER);
    hovered = el;
    if (hovered) hovered.setAttribute(HOVER, '1');
    send({ type: 'hover', nhId: hovered ? hovered.getAttribute('data-nh-id') : null });
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    if (hovered) { hovered.removeAttribute(HOVER); hovered = null; }
    send({ type: 'hover', nhId: null });
  });

  // 캡처 단계에서 가로챈다. 목업 안의 기본 동작보다 먼저 잡아야
  // 링크나 라벨 클릭이 선택을 삼키지 않는다.
  document.addEventListener('click', function (e) {
    var el = target(e.target);

    if (mode === 'preview') {
      var goto = el && el.getAttribute('data-goto');
      if (goto) {
        e.preventDefault();
        e.stopPropagation();
        send({ type: 'navigate', toScreenKey: goto, fromNhId: el.getAttribute('data-nh-id') });
      }
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    send({ type: 'select', meta: el ? metaOf(el) : null });
  }, true);

  // 폼 제출은 sandbox가 이미 막지만, 눌렀을 때 콘솔 오류가 뜨는 것을 피한다.
  document.addEventListener('submit', function (e) { e.preventDefault(); }, true);

  function docHeight() {
    var b = document.body, h = document.documentElement;
    return Math.max(b ? b.scrollHeight : 0, h ? h.scrollHeight : 0, b ? b.offsetHeight : 0);
  }

  var lastHeight = 0;
  function reportHeight() {
    var next = docHeight();
    if (Math.abs(next - lastHeight) < 2) return;
    lastHeight = next;
    send({ type: 'resize', docHeight: next });
  }

  if (window.ResizeObserver) {
    new ResizeObserver(reportHeight).observe(document.documentElement);
  }
  window.addEventListener('load', reportHeight);

  var STYLE_OK = {};
  for (var s = 0; s < CFG.styleProps.length; s++) STYLE_OK[CFG.styleProps[s]] = true;
  var ATTR_OK = {};
  for (var a = 0; a < CFG.attrs.length; a++) ATTR_OK[CFG.attrs[a]] = true;

  function applyOp(op) {
    var el = document.querySelector('[data-nh-id="' + String(op.nhId).replace(/"/g, '') + '"]');
    if (!el) return;

    if (op.kind === 'text') {
      el.textContent = String(op.value);
      return;
    }
    if (op.kind === 'style' && STYLE_OK[op.prop]) {
      el.style.setProperty(op.prop, String(op.value));
      return;
    }
    if (op.kind === 'attr' && ATTR_OK[op.name]) {
      el.setAttribute(op.name, String(op.value));
      return;
    }
    if (op.kind === 'replace') {
      // 서버에서 정제를 마친 HTML만 이 경로로 들어온다.
      el.outerHTML = String(op.html);
    }
  }

  window.addEventListener('message', function (e) {
    if (e.source !== window.parent) return;
    var d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.__nh !== CFG.proto || d.nonce !== CFG.nonce) return;

    if (d.type === 'setMode') {
      mode = d.mode === 'preview' ? 'preview' : 'select';
      if (mode === 'preview' && hovered) { hovered.removeAttribute(HOVER); hovered = null; }
      return;
    }

    if (d.type === 'highlight') {
      var prev = document.querySelectorAll('[' + SELECTED + ']');
      for (var i = 0; i < prev.length; i++) prev[i].removeAttribute(SELECTED);
      for (var j = 0; j < d.nhIds.length; j++) {
        var el = document.querySelector('[data-nh-id="' + String(d.nhIds[j]).replace(/"/g, '') + '"]');
        if (el) el.setAttribute(SELECTED, '1');
      }
      return;
    }

    if (d.type === 'applyPatch') {
      for (var k = 0; k < d.ops.length; k++) applyOp(d.ops[k]);
      reportHeight();
      return;
    }

    if (d.type === 'requestRects') {
      var items = [];
      for (var m = 0; m < d.nhIds.length; m++) {
        var node = document.querySelector('[data-nh-id="' + String(d.nhIds[m]).replace(/"/g, '') + '"]');
        if (node) items.push({ nhId: d.nhIds[m], rect: docRect(node) });
      }
      send({ type: 'rects', items: items });
      return;
    }

    if (d.type === 'scrollTo') {
      var t = document.querySelector('[data-nh-id="' + String(d.nhId).replace(/"/g, '') + '"]');
      if (t && t.scrollIntoView) t.scrollIntoView({ block: 'center' });
    }
  });

  window.addEventListener('error', function (e) {
    send({ type: 'error', message: String(e.message || '알 수 없는 오류') });
  });

  lastHeight = docHeight();
  send({
    type: 'ready',
    screenKey: CFG.screenKey,
    docHeight: lastHeight,
    elementCount: document.querySelectorAll('[data-nh-id]').length
  });
})();`;
}

/**
 * 정제된 HTML에 CSP와 런타임을 끼워 넣어 srcDoc 문자열을 만든다.
 *
 * CSP는 정제가 뚫렸을 때의 2차 방어선이다. img-src를 data:로 묶어 두면
 * 프레임이 바깥으로 요청을 낼 수 없다.
 */
export function buildSrcDoc(sanitizedHtml: string, nonce: string, screenKey: string): string {
  const csp =
    `<meta http-equiv="Content-Security-Policy" content="` +
    `default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:; ` +
    `script-src 'unsafe-inline'; form-action 'none'; base-uri 'none'">`;

  const script = `<script>${buildRuntime(nonce, screenKey)}</script>`;

  let out = sanitizedHtml;

  // 저장본은 parse5.serialize 결과라 <head>와 </body>가 항상 존재한다.
  // 그래도 손으로 넣은 HTML이 들어올 수 있으니 없을 때를 대비한다.
  out = out.includes('<head>') ? out.replace('<head>', `<head>${csp}`) : csp + out;
  out = out.includes('</body>') ? out.replace('</body>', `${script}</body>`) : out + script;

  return out;
}
