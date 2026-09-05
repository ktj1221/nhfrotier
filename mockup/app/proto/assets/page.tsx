import { ProtoHeader } from "../components/ProtoHeader";
import { AssetCard, AssetUploadCard } from "./components/AssetCard";
import { ASSET_STATS, BRAND_RAMP, COMPONENT_ASSETS, LOGO_ASSETS, PICKED_ASSETS, SCREEN_ASSETS, STATUS_TOKENS } from "./data";

/**
 * 실물/대체본 판정이 public/assets/nh/ 의 파일 존재 여부에 달려 있다.
 * 기본값(auto)이면 빌드 타임에 프리렌더되어 파일을 나중에 떨궈도 재빌드 전까지 반영되지 않는다.
 * next.config.ts 에 cacheComponents 가 없으므로 이 옵션이 유효하다.
 */
export const dynamic = "force-dynamic";

function SectionHeader({ title, count }: { title: string; count: string }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <div className="flex items-baseline gap-2">
        <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
        <span className="text-xs text-slate-400">{count}</span>
      </div>
      <span className="text-xs font-medium text-indigo-600">전체보기 →</span>
    </div>
  );
}

export default function ProtoAssetsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ProtoHeader active="assets" />

      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 mb-1">디자인 자산</h1>
            <p className="text-sm text-slate-500">NH가 이미 가진 로고·컴포넌트·화면·토큰을 AI 생성의 재료로 씁니다.</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 w-[220px] bg-white border border-slate-200 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span className="text-[13px] text-slate-400">자산 검색...</span>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              자산 등록
            </button>
          </div>
        </div>

        <div className="flex items-center gap-8 bg-slate-900 rounded-xl px-6 py-[22px] mb-7">
          <div className="flex-1">
            <p className="text-[13px] text-slate-400 mb-1.5">외부 AI는 백지에서 시작합니다.</p>
            <p className="text-lg font-bold text-white tracking-[-0.02em]">
              뚝딱은 <span className="text-indigo-300">NH가 이미 가진 자산</span>에서 시작합니다.
            </p>
          </div>
          <div className="flex items-stretch">
            {ASSET_STATS.map((stat) => (
              <div key={stat.label} className="px-[22px] border-l border-slate-700">
                <div className="text-[22px] font-bold text-white tracking-[-0.02em]">{stat.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {PICKED_ASSETS.length > 0 && (
          <div className="flex items-center gap-3 bg-white border border-indigo-200 rounded-xl px-5 py-3.5 mb-7">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-bold shrink-0">{PICKED_ASSETS.length}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-800">담은 자산 {PICKED_ASSETS.length}개 · {PICKED_ASSETS[0].inProject}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{PICKED_ASSETS.map((a) => a.name).join(" · ")} — 다음 목업 생성 시 AI가 이 자산들을 참조합니다.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-[13px] font-semibold rounded-lg hover:bg-indigo-700 transition-colors shrink-0">프로젝트에 적용</button>
          </div>
        )}

        <SectionHeader title="로고 · 워드마크" count={String(LOGO_ASSETS.length)} />
        <div className="flex gap-3.5 mb-8 overflow-x-auto pb-1">
          {LOGO_ASSETS.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
          <AssetUploadCard />
        </div>

        <SectionHeader title="컴포넌트" count="23" />
        <div className="flex gap-3.5 mb-8 overflow-x-auto pb-1">
          {COMPONENT_ASSETS.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>

        <SectionHeader title="화면 템플릿" count={String(SCREEN_ASSETS.length)} />
        <div className="flex gap-3.5 mb-8 overflow-x-auto pb-1">
          {SCREEN_ASSETS.map((asset) => (
            <AssetCard key={asset.id} asset={asset} tall />
          ))}
        </div>

        <SectionHeader title="컬러 · 타이포 토큰" count="95" />
        <div className="grid grid-cols-4 gap-3.5">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[13px] font-semibold text-slate-800 mb-0.5">브랜드 램프</div>
            <div className="text-[11px] text-slate-400 mb-3">teal-50 → teal-900 · 10단계</div>
            <div className="flex gap-[3px]">
              {BRAND_RAMP.map((c) => (
                <div key={c} className="flex-1 h-[30px] rounded" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[13px] font-semibold text-slate-800 mb-0.5">상태 시맨틱</div>
            <div className="text-[11px] text-slate-400 mb-3">success · warning · danger · info</div>
            <div className="grid grid-cols-4 gap-1.5">
              {STATUS_TOKENS.map((t) => (
                <div key={t.line} className="h-[30px] rounded-md" style={{ background: t.bg, borderBottom: `3px solid ${t.line}` }} />
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[13px] font-semibold text-slate-800 mb-0.5">금융 방향색</div>
            <div className="text-[11px] text-slate-400 mb-3">국내 관례 · 상승 red / 하락 blue</div>
            <div className="flex items-baseline gap-3.5">
              <span className="text-[17px] font-bold tracking-[-0.02em] text-[#DB3D40]">▲ 2.4%</span>
              <span className="text-[17px] font-bold tracking-[-0.02em] text-[#2B6CF6]">▼ 1.1%</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[13px] font-semibold text-slate-800 mb-0.5">타이포 램프</div>
            <div className="text-[11px] text-slate-400 mb-2.5">Pretendard · display 34 → micro 11</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-extrabold text-[#0E1414] tracking-[-0.03em]">가</span>
              <span className="text-[19px] font-bold text-[#1E2525] tracking-[-0.02em]">나</span>
              <span className="text-[15px] font-medium text-[#333B3B]">다</span>
              <span className="text-[13px] text-[#6E7878]">라</span>
              <span className="text-[11px] text-[#98A2A2]">마</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
