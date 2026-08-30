import Link from "next/link";

const NAV = [
  { key: "dashboard", label: "대시보드", href: "/proto" },
  { key: "projects", label: "프로젝트", href: "/proto/projects" },
  { key: "template", label: "Template", href: "#" },
  { key: "mywork", label: "내 작업", href: "#" },
];

export function ProtoHeader({ active }: { active: "dashboard" | "projects" | "template" | "mywork" }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-7 px-8 shrink-0">
      <Link href="/proto" className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="font-bold text-slate-900 text-sm">NH뚝딱협업스튜디오</span>
      </Link>
      <nav className="flex items-center gap-1">
        {NAV.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === item.key ? "text-indigo-600 bg-indigo-50" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4a2 2 0 01-.6-1.4V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3C7.7 6.2 6 8.4 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">김</div>
          <span className="text-sm font-medium text-slate-700">김민준</span>
        </div>
      </div>
    </header>
  );
}
