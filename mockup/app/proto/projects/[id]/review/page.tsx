import { ProjectChrome } from "../../../components/ProjectChrome";
import { Avatar } from "@/app/components/Avatar";
import { COMMENTS, REVIEW_ITEMS } from "../../../data";

const GROUP_STYLE = {
  합의: { dot: "bg-green-600", label: "text-green-700" },
  이견: { dot: "bg-amber-600", label: "text-amber-700" },
  추가확인: { dot: "bg-blue-600", label: "text-blue-700" },
} as const;

export default function ProtoReviewPage() {
  const groups = ["합의", "이견", "추가확인"] as const;

  return (
    <ProjectChrome active="review">
      <main className="flex-1 overflow-auto flex justify-center p-6 bg-slate-100 min-w-0">
        <div className="relative w-full max-w-[820px] h-fit">
          <div className="bg-white rounded-[10px] shadow-xl overflow-hidden">
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
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[34px] left-[230px] w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_3px_rgba(79,70,229,0.2)]">1</div>
          <div className="absolute top-[118px] left-20 w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_3px_rgba(79,70,229,0.2)]">2</div>
          <div className="absolute top-[118px] left-[220px] w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_3px_rgba(79,70,229,0.2)]">3</div>
        </div>
      </main>

      <aside className="w-[400px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden">
        <div className="flex-[1.3] overflow-auto p-4 border-b border-slate-200">
          <h2 className="text-[12.5px] font-bold text-slate-900 mb-3">AI 의견요약</h2>
          {groups.map((g) => {
            const items = REVIEW_ITEMS.filter((r) => r.group === g);
            const style = GROUP_STYLE[g];
            return (
              <div key={g} className="mb-3.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  <span className={`text-[11px] font-bold ${style.label}`}>{g} · {items.length}건</span>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="border border-slate-200 rounded-[10px] px-3 py-2.5 mb-2 last:mb-0">
                    <p className="text-xs font-semibold text-slate-800 mb-1">
                      {item.id <= 3 ? `${["①", "②", "③"][item.id - 1] ?? ""} ${item.title}` : item.title}
                    </p>
                    <p className="text-[11.5px] text-slate-500 leading-relaxed mb-2">{item.detail}</p>
                    {item.decision ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {item.decision}됨
                      </span>
                    ) : (
                      <div className="flex gap-1.5">
                        <button className="px-2.5 py-1 rounded-md text-[11px] font-semibold border border-green-200 text-green-700">반영</button>
                        <button className="px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-200 text-amber-700">보류</button>
                        <button className="px-2.5 py-1 rounded-md text-[11px] font-semibold border border-red-200 text-red-700">반려</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="flex-1 overflow-auto p-3.5">
          <h2 className="text-[12.5px] font-bold text-slate-900 mb-2.5">댓글 (원 의견)</h2>
          <div className="flex flex-col gap-3">
            {COMMENTS.map((c, i) => (
              <div key={i} className="flex gap-2">
                <Avatar name={c.user.name} color={c.user.color} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-semibold text-slate-800">{c.user.name}</span>
                    <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 px-1 rounded">{["①", "②", "③"][c.pin - 1]}</span>
                    <span className="text-[10px] text-slate-400 ml-auto">{c.time}</span>
                  </div>
                  <p className="text-[11.5px] text-slate-700 bg-slate-50 rounded-lg px-2 py-1.5 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </ProjectChrome>
  );
}
