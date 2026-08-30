import { ProjectChrome } from "../../components/ProjectChrome";
import { Avatar } from "@/app/components/Avatar";
import { COMMENTS, PROJECT } from "../../data";

export default function ProtoWorkspacePage() {
  return (
    <ProjectChrome active="workspace">
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="flex border-b border-slate-100">
          <span className="flex-1 text-center py-2.5 text-xs font-semibold text-indigo-600 border-b-2 border-indigo-600">파일</span>
          <span className="flex-1 text-center py-2.5 text-xs font-semibold text-slate-400">Template</span>
          <span className="flex-1 text-center py-2.5 text-xs font-semibold text-slate-400">멤버</span>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <p className="text-[11.5px] text-slate-400 leading-relaxed mb-3">참고자료를 등록하면 AI가 스타일을 참고해 결과물을 생성합니다.</p>
          <div className="flex flex-col gap-2 mb-3">
            {["기존_포털_UI.png", "브랜드가이드.pdf", "경쟁사_벤치마크.pdf"].map((name) => (
              <div key={name} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-[11.5px] text-slate-700">{name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-[11.5px]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            자료 추가 (3/3)
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-slate-100 min-w-0">
        <div className="h-12 bg-white border-b border-slate-200 flex items-center gap-2.5 px-4 shrink-0">
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">v{PROJECT.version}</span>
          <span className="text-[12.5px] font-medium text-slate-700">대시보드 초안 — {PROJECT.versionSummary}</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <span className="px-3 py-1.5 text-[11.5px] rounded-md bg-white text-slate-900 shadow-sm">데스크톱</span>
              <span className="px-3 py-1.5 text-[11.5px] text-slate-400">모바일</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-600 bg-white">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              HTML
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex justify-center p-6">
          <div className="w-full max-w-3xl h-fit bg-white rounded-[10px] shadow-xl overflow-hidden">
            <div className="h-11 bg-indigo-600 flex items-center px-[18px] gap-2.5">
              <div className="w-4 h-4 rounded bg-white/25" />
              <span className="text-xs text-white font-semibold">환영합니다, 고객님</span>
              <span className="ml-auto text-[11px] text-white bg-white/20 px-2.5 py-1 rounded-full">포인트 12,400P</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-indigo-50 rounded-lg border border-indigo-100" />
                <div className="h-16 bg-slate-50 rounded-lg border border-slate-200" />
                <div className="h-16 bg-slate-50 rounded-lg border border-slate-200" />
              </div>
              <div>
                <div className="h-3 w-32 bg-slate-200 rounded mb-2.5" />
                <div className="flex flex-col gap-2">
                  <div className="h-10 bg-slate-50 rounded-lg border border-slate-100" />
                  <div className="h-10 bg-slate-50 rounded-lg border border-slate-100" />
                  <div className="h-10 bg-slate-50 rounded-lg border border-slate-100" />
                </div>
              </div>
              <div>
                <div className="h-3 w-24 bg-slate-200 rounded mb-2.5" />
                <div className="h-14 bg-slate-50 rounded-lg border border-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
        <div className="flex border-b border-slate-100">
          <span className="flex-1 text-center py-3 text-xs font-semibold text-slate-400">AI Chat</span>
          <span className="flex-1 text-center py-3 text-xs font-semibold text-indigo-600 border-b-2 border-indigo-600">의견 ({COMMENTS.length})</span>
          <span className="flex-1 text-center py-3 text-xs font-semibold text-slate-400">AI 의견요약</span>
        </div>
        <div className="flex-1 overflow-auto p-3.5 flex flex-col gap-3">
          {COMMENTS.map((c, i) => (
            <div key={i} className="flex gap-2">
              <Avatar name={c.user.name} color={c.user.color} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11.5px] font-semibold text-slate-800">{c.user.name}</span>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-[11.5px] text-slate-700 bg-slate-50 rounded-lg px-2.5 py-2 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-slate-100">
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-semibold flex items-center justify-center shrink-0">김</div>
            <div className="flex-1 h-[52px] border border-slate-200 rounded-lg bg-white" />
          </div>
        </div>
      </aside>
    </ProjectChrome>
  );
}
