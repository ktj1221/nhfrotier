'use client';

import { EDITABLE_STYLE_PROPS, type ElementMeta } from '@/lib/canvas/protocol';

/** 사람이 읽는 이름. 키는 CSS 속성 그대로 둔다. */
const PROP_LABELS: Record<string, string> = {
  color: '글자색',
  'background-color': '배경색',
  'font-size': '글자 크기',
  'font-weight': '글자 굵기',
  'text-align': '정렬',
  'border-radius': '모서리',
  'border-color': '테두리색',
  padding: '안쪽 여백',
  margin: '바깥 여백',
  opacity: '투명도',
  display: '표시',
};

/** rgb(11, 132, 120) 같은 계산값을 색 견본으로 보여주기 위한 판별. */
function isColorValue(value: string): boolean {
  return /^(rgb|rgba|#)/i.test(value.trim());
}

export function ElementPanel({ meta }: { meta: ElementMeta | null }) {
  if (!meta) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-slate-500">화면에서 요소를 클릭하세요.</p>
        <p className="mt-1 text-xs text-slate-400">
          버튼·입력창·카드 등 무엇이든 고를 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-white">
            &lt;{meta.tag}&gt;
          </span>
          <span className="font-mono text-[11px] text-slate-400">{meta.nhId}</span>
        </div>
        {meta.text && (
          <p className="mt-2 line-clamp-3 text-sm text-slate-700">{meta.text}</p>
        )}
      </div>

      {Object.keys(meta.attrs).length > 0 && (
        <div>
          <h4 className="mb-1.5 text-[11px] font-semibold tracking-wide text-slate-400">속성</h4>
          <dl className="space-y-1">
            {Object.entries(meta.attrs).map(([name, value]) => (
              <div key={name} className="flex gap-2 text-xs">
                <dt className="w-24 shrink-0 truncate font-mono text-slate-400">{name}</dt>
                <dd className="truncate text-slate-700">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div>
        <h4 className="mb-1.5 text-[11px] font-semibold tracking-wide text-slate-400">스타일</h4>
        <dl className="space-y-1">
          {EDITABLE_STYLE_PROPS.map((prop) => {
            const value = meta.computed[prop];
            if (!value) return null;
            return (
              <div key={prop} className="flex items-center gap-2 text-xs">
                <dt className="w-24 shrink-0 text-slate-400">{PROP_LABELS[prop] ?? prop}</dt>
                <dd className="flex min-w-0 items-center gap-1.5 text-slate-700">
                  {isColorValue(value) && (
                    <span
                      className="h-3 w-3 shrink-0 rounded border border-slate-300"
                      style={{ backgroundColor: value }}
                    />
                  )}
                  <span className="truncate font-mono">{value}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="rounded-lg bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-500">
        크기 {Math.round(meta.rect.w)} × {Math.round(meta.rect.h)}
        <br />
        위치 {Math.round(meta.rect.x)}, {Math.round(meta.rect.y)}
      </div>
    </div>
  );
}
