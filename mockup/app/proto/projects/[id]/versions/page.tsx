import { ProjectChrome } from "../../../components/ProjectChrome";
import { Avatar } from "@/app/components/Avatar";
import { VERSIONS } from "../../../data";

export default function ProtoVersionsPage() {
  return (
    <ProjectChrome active="versions">
      <aside className="w-[250px] bg-white border-r border-slate-200 overflow-auto shrink-0">
        <div className="px-4 pt-3.5 pb-2">
          <h2 className="text-[12.5px] font-bold text-slate-900">Version 목록</h2>
        </div>
        {VERSIONS.map((v) => (
          <div key={v.no} className={`px-4 py-3 border-l-[3px] ${v.current ? "border-indigo-600 bg-indigo-50" : "border-transparent"}`}>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`text-sm font-bold ${v.current ? "text-indigo-600" : "text-slate-700"}`}>v{v.no}</span>
              <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">{v.source}</span>
            </div>
            <p className="text-[11.5px] text-slate-800 mb-0.5">{v.summary}</p>
            <p className="text-[10.5px] text-slate-400">{v.author} · {v.time}{v.current ? " · 현재" : ""}</p>
          </div>
        ))}
      </aside>

      <main className="flex-1 overflow-auto px-6 py-5 min-w-0">
        <div className="flex items-center gap-2.5 mb-[18px]">
          <span className="text-xs text-slate-500">비교 대상</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600">
            기준 v2
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-indigo-200 bg-indigo-50 text-indigo-600 rounded-lg text-xs">
            현재 v3
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 mb-2">v2 (기준)</p>
            <div className="bg-white border border-slate-200 rounded-[10px] overflow-hidden">
              <div className="h-8 bg-indigo-400 flex items-center px-3">
                <span className="text-[10px] text-white">환영합니다, 고객님</span>
                <span className="ml-auto text-[9px] text-white bg-white/20 px-1.5 py-0.5 rounded-full">포인트</span>
              </div>
              <div className="p-3.5 flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-slate-100 rounded-md" />
                  <div className="h-8 bg-slate-100 rounded-md" />
                  <div className="h-8 bg-slate-100 rounded-md" />
                </div>
                <div className="h-7 bg-slate-50 rounded-md" />
                <div className="h-7 bg-slate-50 rounded-md" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-indigo-600 mb-2">v3 (현재)</p>
            <div className="bg-white border-2 border-indigo-600 rounded-[10px] overflow-hidden">
              <div className="h-8 bg-indigo-600 flex items-center px-3">
                <span className="text-[10px] text-white">환영합니다, 고객님</span>
                <span className="ml-auto text-[9px] text-white bg-white/25 px-1.5 py-0.5 rounded-full">포인트 12,400P</span>
              </div>
              <div className="p-3.5 flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-11 bg-indigo-200 border-[1.5px] border-indigo-600 rounded-md" />
                  <div className="h-8 bg-slate-100 rounded-md self-end" />
                  <div className="h-8 bg-slate-100 rounded-md self-end" />
                </div>
                <div className="h-7 bg-slate-50 rounded-md" />
                <div className="h-7 bg-slate-50 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[10px] p-4">
          <p className="text-xs font-bold text-slate-900 mb-2.5">변경사항</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">변경</span>
              <span className="text-xs text-slate-700">포인트 카드 크기 1.5배 확대, 강조 색상(인디고) 적용</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">변경</span>
              <span className="text-xs text-slate-700">헤더 영역에 포인트 수치(12,400P) 노출 추가</span>
            </div>
          </div>
        </div>
      </main>

      <aside className="w-80 bg-white border-l border-slate-200 overflow-auto shrink-0 p-4">
        <h2 className="text-[12.5px] font-bold text-slate-900 mb-2">변경 요약</h2>
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-3 py-2.5 mb-5">
          검토자 의견 중 &quot;합의&quot;로 분류된 포인트 영역 강조 요청을 반영해 카드 크기와 색상을 조정했습니다. AI_REVISION으로 v2에서 파생되었습니다.
        </p>

        <h2 className="text-[12.5px] font-bold text-slate-900 mb-2.5">관련 의견</h2>
        <div className="flex flex-col gap-2.5">
          {[
            { name: "이서연", color: "pink" as const, text: '"포인트 영역이 잘 안 보여요, 더 크게 강조해주세요."' },
            { name: "박준혁", color: "blue" as const, text: '"색상도 브랜드 인디고로 통일해주세요."' },
          ].map((c) => (
            <div key={c.name} className="flex gap-2">
              <Avatar name={c.name} color={c.color} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] text-slate-700 leading-relaxed mb-1">{c.text}</p>
                <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">반영됨</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </ProjectChrome>
  );
}
