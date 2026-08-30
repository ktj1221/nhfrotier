import Link from "next/link";
import { PROJECT, PROJECT_ID } from "../data";

const TABS = [
  { key: "workspace", label: "작업공간", href: `/proto/projects/${PROJECT_ID}` },
  { key: "chat", label: "AI Chat", href: `/proto/projects/${PROJECT_ID}/chat` },
  { key: "review", label: "결과/리뷰", href: `/proto/projects/${PROJECT_ID}/review` },
  { key: "versions", label: "Version", href: `/proto/projects/${PROJECT_ID}/versions` },
  { key: "history", label: "History", href: `/proto/projects/${PROJECT_ID}/history` },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const QUICK_ACTIONS = [
  {
    key: "versions",
    label: "Version",
    href: `/proto/projects/${PROJECT_ID}/versions`,
    icon: "M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4M4 12l8 4 8-4",
  },
  {
    key: "history",
    label: "History",
    href: `/proto/projects/${PROJECT_ID}/history`,
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0",
  },
  {
    key: "export",
    label: "Export",
    href: "#",
    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  },
];

export function ProjectChrome({ active, children }: { active: TabKey; children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-2.5 px-6 shrink-0">
        <Link href="/proto" className="w-[26px] h-[26px] bg-indigo-600 rounded-[7px] flex items-center justify-center shrink-0">
          <svg className="w-[15px] h-[15px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </Link>
        <Link href="/proto" className="text-sm text-slate-400 hover:text-slate-700">대시보드</Link>
        <span className="text-sm text-slate-300">/</span>
        <Link href="/proto/projects" className="text-sm text-slate-400 hover:text-slate-700">프로젝트</Link>
        <span className="text-sm text-slate-300">/</span>
        <span className="text-sm font-semibold text-slate-900">{PROJECT.name}</span>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{PROJECT.status}</span>

        <div className="ml-auto flex items-center gap-2">
          {QUICK_ACTIONS.filter((a) => a.key !== active).map((a) => (
            <Link
              key={a.key}
              href={a.href}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-50"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
              </svg>
              {a.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-slate-200 mx-0.5" />
          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">김</div>
        </div>
      </header>

      <div className="h-11 bg-white border-b border-slate-200 flex items-center px-6 gap-2 shrink-0">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`px-4 py-3 text-[13px] font-semibold border-b-2 -mb-px transition-colors ${
              active === tab.key ? "text-indigo-600 border-indigo-600" : "text-slate-400 border-transparent hover:text-slate-600"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden">{children}</div>
    </div>
  );
}
