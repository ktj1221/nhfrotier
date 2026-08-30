import Link from "next/link";
import { ProtoHeader } from "../components/ProtoHeader";
import { Avatar } from "@/app/components/Avatar";
import { PROJECTS_LIST, PROJECT_ID } from "../data";

const STATUS_STYLE: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  ACTIVE: "bg-indigo-50 text-indigo-600",
  REVIEW: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-green-50 text-green-700",
  ARCHIVED: "bg-slate-50 text-slate-400 border border-slate-200",
};

const FILTERS = ["전체", "DRAFT", "ACTIVE", "REVIEW", "COMPLETED", "ARCHIVED"];

export default function ProtoProjectListPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ProtoHeader active="projects" />

      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 mb-1">프로젝트</h1>
            <p className="text-sm text-slate-500">기획안을 목업으로 변환하고 팀과 협업하세요.</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            새 프로젝트
          </button>
        </div>

        <div className="flex items-center gap-5 mb-4">
          <div className="flex items-center gap-2 flex-1 max-w-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
            <span className="text-[13px] text-slate-400">프로젝트 검색...</span>
          </div>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <span
                key={f}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border ${
                  f === "전체" ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-500"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2.4fr_1fr_1.3fr_1fr_1.1fr_1.1fr_32px] px-5 py-3 bg-slate-50 border-b border-slate-200">
            {["프로젝트명", "상태", "소유자", "멤버", "마지막 활동", "미처리 검토"].map((h) => (
              <span key={h} className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
            ))}
            <span />
          </div>

          {PROJECTS_LIST.map((p, i) => (
            <Link
              key={p.id}
              href={`/proto/projects/${PROJECT_ID}`}
              className={`grid grid-cols-[2.4fr_1fr_1.3fr_1fr_1.1fr_1.1fr_32px] items-center px-5 py-3.5 hover:bg-slate-50 transition-colors ${
                i < PROJECTS_LIST.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <span className={`text-sm font-semibold ${p.status === "ARCHIVED" ? "text-slate-400" : "text-slate-800"}`}>{p.name}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full w-fit ${STATUS_STYLE[p.status]}`}>{p.status}</span>
              <div className="flex items-center gap-1.5">
                <Avatar name={p.owner.name} color={p.owner.color} size="sm" />
                <span className="text-[12.5px] text-slate-600">{p.owner.name}</span>
              </div>
              <span className="text-[12.5px] text-slate-600">{p.members}명</span>
              <span className="text-[12.5px] text-slate-400">{p.lastActive}</span>
              {p.pendingReview > 0 ? (
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full w-fit">{p.pendingReview}건</span>
              ) : (
                <span className="text-[12.5px] text-slate-300">—</span>
              )}
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
