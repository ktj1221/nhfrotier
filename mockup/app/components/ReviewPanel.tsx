'use client';

import { Avatar } from './Avatar';

export interface Finding {
  id: string;
  rule_id: string;
  category: string;
  severity: string;
  title: string;
  evidence: string;
  why: string;
  suggestion: string;
  needs_compliance_review: number;
  decision: string | null;
  decision_by: string | null;
  decided_at: string | null;
  decided_by_name?: string;
  decided_by_color?: string;
}

export interface ReviewMeta {
  id: string;
  status: string;
  created_at: string;
}

export type Decision = 'ACCEPTED' | 'DEFERRED' | 'REJECTED' | 'COMPLIANCE_REQUESTED';

// Tailwind가 클래스명을 정적으로 스캔하므로 전체 문자열을 그대로 둔다
const CATEGORY_STYLE: Record<string, { label: string; badge: string; bar: string }> = {
  CONSUMER: { label: '금융소비자보호', badge: 'bg-amber-50 text-amber-700', bar: 'border-l-amber-400' },
  EXPRESSION: { label: '표현·차별', badge: 'bg-rose-50 text-rose-700', bar: 'border-l-rose-400' },
  DARKPATTERN: { label: '다크패턴', badge: 'bg-purple-50 text-purple-700', bar: 'border-l-purple-400' },
  ACCESSIBILITY: { label: '접근성', badge: 'bg-sky-50 text-sky-700', bar: 'border-l-sky-400' },
};

const SEVERITY_STYLE: Record<string, { label: string; badge: string }> = {
  HIGH: { label: '높음', badge: 'bg-red-100 text-red-700' },
  MEDIUM: { label: '보통', badge: 'bg-amber-100 text-amber-700' },
  LOW: { label: '낮음', badge: 'bg-slate-100 text-slate-600' },
};

const DECISION_LABEL: Record<string, string> = {
  ACCEPTED: '반영',
  DEFERRED: '보류',
  REJECTED: '반려',
  COMPLIANCE_REQUESTED: '준법 검토 요청',
};

const DECISION_BADGE: Record<string, string> = {
  ACCEPTED: 'bg-green-50 text-green-700',
  DEFERRED: 'bg-amber-50 text-amber-700',
  REJECTED: 'bg-red-50 text-red-700',
  COMPLIANCE_REQUESTED: 'bg-indigo-50 text-indigo-700',
};

const FALLBACK_CATEGORY = { label: '기타', badge: 'bg-slate-100 text-slate-600', bar: 'border-l-slate-300' };

interface Props {
  hasMockup: boolean;
  review: ReviewMeta | null;
  findings: Finding[];
  reviewing: boolean;
  decidingId: string | null;
  canDecide: boolean;
  onRun: () => void;
  onDecide: (findingId: string, decision: Decision) => void;
}

export function ReviewPanel({
  hasMockup,
  review,
  findings,
  reviewing,
  decidingId,
  canDecide,
  onRun,
  onDecide,
}: Props) {
  if (!hasMockup) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-xs text-slate-400 text-center">
          목업 버전을 선택하면
          <br />
          책임성 검토 결과를 볼 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-100 shrink-0 flex items-center justify-between gap-2">
        <p className="text-[10px] text-slate-400 leading-tight">
          AI가 제안합니다. 반영 여부는 담당자가 결정합니다.
        </p>
        <button
          onClick={onRun}
          disabled={reviewing}
          className="shrink-0 px-2 py-1 text-[11px] font-medium border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 disabled:opacity-50 transition-colors"
        >
          {reviewing ? '검토 중...' : review ? '다시 검토' : '검토 실행'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {reviewing && (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs text-slate-400 text-center">
              화면을 검토하고 있습니다...
              <br />
              30초 정도 걸립니다.
            </p>
          </div>
        )}

        {!reviewing && !review && (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs text-slate-400 text-center">아직 검토하지 않았습니다.</p>
          </div>
        )}

        {!reviewing && review?.status === 'FAILED' && (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs text-red-500 text-center">
              검토에 실패했습니다.
              <br />
              다시 검토를 눌러주세요.
            </p>
          </div>
        )}

        {!reviewing && review?.status === 'DONE' && findings.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs text-slate-400 text-center">검토했지만 지적할 항목이 없습니다.</p>
          </div>
        )}

        {!reviewing &&
          findings.map((f) => {
            const cat = CATEGORY_STYLE[f.category] ?? FALLBACK_CATEGORY;
            const sev = SEVERITY_STYLE[f.severity] ?? SEVERITY_STYLE.MEDIUM;
            const isDeciding = decidingId === f.id;

            return (
              <div
                key={f.id}
                className={`border border-slate-200 border-l-4 ${cat.bar} rounded-lg px-3 py-2.5 bg-white`}
              >
                <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                  <span className="text-[9px] text-slate-500" title="AI 제안">
                    AI
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${cat.badge}`}>
                    {cat.label}
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${sev.badge}`}>
                    {sev.label}
                  </span>
                  <span className="text-[9px] text-slate-300 ml-auto">{f.rule_id}</span>
                </div>

                <p className="text-xs font-semibold text-slate-800 mb-1.5">{f.title}</p>

                <p className="text-[11px] text-slate-600 bg-slate-50 border border-slate-100 rounded px-2 py-1.5 mb-1.5 font-mono break-words">
                  {f.evidence}
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed mb-1">{f.why}</p>
                <p className="text-[11px] text-slate-700 leading-relaxed mb-2">
                  <span className="text-slate-400">제안 </span>
                  {f.suggestion}
                </p>

                {f.decision ? (
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-md ${DECISION_BADGE[f.decision] ?? 'bg-slate-100 text-slate-600'}`}
                    >
                      {DECISION_LABEL[f.decision] ?? f.decision}
                    </span>
                    {f.decided_by_name && (
                      <>
                        <Avatar name={f.decided_by_name} color={f.decided_by_color ?? 'indigo'} size="sm" />
                        <span className="text-[10px] text-slate-400">{f.decided_by_name}</span>
                      </>
                    )}
                    {f.decided_at && (
                      <span className="text-[10px] text-slate-300 ml-auto">
                        {new Date(f.decided_at).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                ) : !canDecide ? (
                  <p className="text-[10px] text-slate-400">결정하려면 상단에서 사용자를 선택하세요.</p>
                ) : (
                  <div className="flex gap-1 flex-wrap">
                    <button
                      onClick={() => onDecide(f.id, 'ACCEPTED')}
                      disabled={isDeciding}
                      className="px-2 py-1 rounded-md text-[11px] font-semibold border border-green-200 text-green-700 hover:bg-green-50 disabled:opacity-50 transition-colors"
                    >
                      반영
                    </button>
                    <button
                      onClick={() => onDecide(f.id, 'DEFERRED')}
                      disabled={isDeciding}
                      className="px-2 py-1 rounded-md text-[11px] font-semibold border border-amber-200 text-amber-700 hover:bg-amber-50 disabled:opacity-50 transition-colors"
                    >
                      보류
                    </button>
                    <button
                      onClick={() => onDecide(f.id, 'REJECTED')}
                      disabled={isDeciding}
                      className="px-2 py-1 rounded-md text-[11px] font-semibold border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50 transition-colors"
                    >
                      반려
                    </button>
                    <button
                      onClick={() => onDecide(f.id, 'COMPLIANCE_REQUESTED')}
                      disabled={isDeciding}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors disabled:opacity-50 ${
                        f.needs_compliance_review
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'border border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                      }`}
                    >
                      준법 검토 요청
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
