import Link from "next/link";
import { ProtoHeader } from "./components/ProtoHeader";
import { Avatar } from "@/app/components/Avatar";
import { PROJECTS_LIST, PROJECT_ID } from "./data";

const STATUS_STYLE: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  ACTIVE: "bg-indigo-50 text-indigo-600",
  REVIEW: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-green-50 text-green-700",
  ARCHIVED: "bg-slate-50 text-slate-400 border border-slate-200",
};

export default function ProtoDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ProtoHeader active="dashboard" />

      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="mb-7">
          <h1 className="text-[22px] font-bold text-slate-900 mb-1">안녕하세요, 김민준님</h1>
          <p className="text-sm text-slate-500">오늘의 업무 현황을 확인하세요.</p>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3.5">나의 작업</h2>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-800 font-medium">고객 포털 리뉴얼 · 대시보드 초안 생성</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">요청 3분 전</p>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full shrink-0">PROCESSING</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-800 font-medium">채널 앱 리뉴얼 · 로그인 화면 시안</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">완료 41분 전</p>
                </div>
                <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full shrink-0">COMPLETED</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-800 font-medium">지점 안내 리플렛 · 초안 생성</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">LLM 응답 지연으로 실패 · 2시간 전</p>
                </div>
                <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full shrink-0">FAILED</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3.5">검토 대기</h2>
            <div className="flex flex-col gap-2.5">
              <Link href={`/proto/projects/${PROJECT_ID}/review`} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-800 font-medium">고객 포털 리뉴얼 · v3 의견 4건 대기</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">AI 의견요약 완료 · 12분 전</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 whitespace-nowrap">반영 결정하기 →</span>
              </Link>
              <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-800 font-medium">모바일뱅킹 온보딩 · 의견 취합 완료</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">합의 3 · 이견 1 · 추가확인 1 · 1시간 전</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 whitespace-nowrap">확인하기 →</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-800 font-medium">신용카드 프로모션 배너 · 최종 검토</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">준법 검토자 확인 대기 · 3시간 전</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 whitespace-nowrap">확인하기 →</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">최근 프로젝트</h2>
            <Link href="/proto/projects" className="text-xs font-medium text-indigo-600">전체보기 →</Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {PROJECTS_LIST.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/proto/projects/${PROJECT_ID}`}
                className="bg-white border border-slate-200 rounded-xl p-[18px] hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                  {p.pendingReview > 0 && (
                    <span className="ml-auto text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">검토 {p.pendingReview}건</span>
                  )}
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-1.5">{p.name}</h3>
                <p className="text-xs text-slate-400 mb-3.5">{p.lastActive} 활동</p>
                <div className="flex items-center -space-x-1.5">
                  {[p.owner].map((m, i) => (
                    <div key={i} className="ring-2 ring-white rounded-full">
                      <Avatar name={m.name} color={m.color} size="sm" />
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3.5">최근 Version</h2>
            <div className="flex flex-col">
              {[
                { v: 3, text: "고객 포털 리뉴얼 — 포인트 영역 강조 반영", time: "12분 전" },
                { v: 2, text: "채널 앱 리뉴얼 — 로그인 화면 초안 수정", time: "41분 전" },
                { v: 1, text: "모바일뱅킹 온보딩 — 최초 초안 생성", time: "2시간 전" },
              ].map((row, i, arr) => (
                <div key={row.v} className={`flex items-center gap-2.5 py-2.5 ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">v{row.v}</span>
                  <p className="flex-1 text-[13px] text-slate-800">{row.text}</p>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3.5">최근 활동</h2>
            <div className="flex flex-col gap-3.5">
              {[
                { icon: "user", text: <><b>김민준</b>님이 의견 3건을 반영해 <b>v3</b>를 생성했습니다.</>, time: "12분 전" },
                { icon: "ai", text: <><b>AI</b>가 의견 5건을 합의 2 · 이견 2 · 추가확인 1로 정리했습니다.</>, time: "28분 전" },
                { icon: "user", text: <><b>이서연</b>님이 의견을 남겼습니다: &quot;포인트 영역이 잘 안보여요&quot;</>, time: "41분 전" },
                { icon: "file", text: <><b>박준혁</b>님이 참고자료 &apos;브랜드가이드.pdf&apos;를 업로드했습니다.</>, time: "1시간 전" },
              ].map((row, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${row.icon === "ai" ? "bg-violet-50 text-violet-600" : row.icon === "file" ? "bg-slate-100 text-slate-500" : "bg-indigo-50 text-indigo-600"}`}>
                    {row.icon === "ai" ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 3l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    ) : row.icon === "file" ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )}
                  </div>
                  <p className="text-[12.5px] text-slate-700 leading-relaxed">{row.text} <span className="text-slate-400">· {row.time}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
