import Link from "next/link";
import { ProjectChrome } from "../../../components/ProjectChrome";
import { HISTORY, PROJECT_ID } from "../../../data";

const ACTOR_ICON: Record<string, { bg: string; fg: string; path: string }> = {
  user: { bg: "bg-indigo-50", fg: "text-indigo-600", path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ai: { bg: "bg-violet-50", fg: "text-violet-600", path: "M13 3l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  system: { bg: "bg-slate-100", fg: "text-slate-500", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
};

const FILTERS = ["전체", "사용자 작업", "AI 작업", "댓글", "Version"];

export default function ProtoHistoryPage() {
  const groups = Array.from(new Set(HISTORY.map((h) => h.group)));

  return (
    <ProjectChrome active="history">
      <main className="flex-1 overflow-auto flex justify-center">
        <div className="w-full max-w-3xl py-6 pb-10">
          <div className="flex items-center gap-2 mb-5">
            {FILTERS.map((f) => (
              <span
                key={f}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                  f === "전체" ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-500"
                }`}
              >
                {f}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
              최근 7일
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {groups.map((group) => {
            const items = HISTORY.filter((h) => h.group === group);
            return (
              <div key={group}>
                <p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide mb-3 mt-2 first:mt-0">{group}</p>
                <div className="flex flex-col">
                  {items.map((h, i) => {
                    const icon = ACTOR_ICON[h.actor];
                    const isLast = i === items.length - 1;
                    return (
                      <div key={i} className="flex gap-3.5">
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${icon.bg} ${icon.fg}`}>
                            <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={icon.path} /></svg>
                          </div>
                          {!isLast && <div className="w-[1.5px] flex-1 bg-slate-200 mt-0.5" />}
                        </div>
                        <div className="pb-[22px]">
                          <p className="text-[13px] text-slate-800 mb-0.5">
                            {h.bold && <b>{h.bold}</b>}
                            {h.text}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400">{h.time}</span>
                            {h.link && (
                              <Link href={`/proto/projects/${PROJECT_ID}/versions`} className="text-[10.5px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                                {h.link} →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </ProjectChrome>
  );
}
