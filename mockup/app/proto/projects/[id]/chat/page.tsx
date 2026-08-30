import { ProjectChrome } from "../../../components/ProjectChrome";
import { Avatar } from "@/app/components/Avatar";
import { CHAT_MESSAGES } from "../../../data";

export default function ProtoChatPage() {
  return (
    <ProjectChrome active="chat">
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-auto flex justify-center">
          <div className="w-full max-w-3xl py-7 flex flex-col gap-[18px]">
            {CHAT_MESSAGES.map((m, i) =>
              m.from === "user" ? (
                <div key={i} className="flex justify-end gap-2.5">
                  <div className="max-w-[70%] bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-[13.5px] leading-relaxed">
                    {m.text}
                  </div>
                  <Avatar name={m.user!.name} color={m.user!.color} size="sm" />
                </div>
              ) : (
                <div key={i} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 3l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <div className="max-w-[70%]">
                    <p className="text-[11px] font-semibold text-violet-600 mb-1">AI 어시스턴트</p>
                    {m.status === "PROCESSING" ? (
                      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-300" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-100" />
                        목업을 수정하고 있습니다...
                      </div>
                    ) : (
                      <>
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-[13.5px] leading-relaxed text-slate-700">
                          {m.text}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{m.status}</span>
                          <span className="text-xs font-semibold text-indigo-600">결과물 보기 →</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white border-t border-slate-200 py-3.5 shrink-0">
          <div className="max-w-3xl mx-auto px-1">
            <div className="flex gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 10-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                참고자료 (2/3 선택됨)
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                Template: NH 대시보드 공통형
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                작업유형: 웹 화면 시안
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-[14px] pl-4 pr-1.5 py-1.5">
              <span className="flex-1 text-[13.5px] text-slate-400">메시지를 입력하세요...</span>
              <button className="w-[34px] h-[34px] rounded-[10px] bg-indigo-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProjectChrome>
  );
}
