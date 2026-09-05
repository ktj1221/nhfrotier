import type { Asset, AssetSource } from "../data";
import { AssetThumb, assetFileExists } from "./AssetThumb";

const SOURCE_STYLE: Record<AssetSource, { label: string; className: string }> = {
  allone: { label: "올원뱅크", className: "bg-teal-50 text-teal-700" },
  corp: { label: "기업뱅킹", className: "bg-blue-50 text-blue-700" },
  nh: { label: "NH공통", className: "bg-green-50 text-green-700" },
};

export function AssetCard({ asset, tall }: { asset: Asset; tall?: boolean }) {
  const real = assetFileExists(asset.src);
  const source = SOURCE_STYLE[asset.source];
  const picked = Boolean(asset.inProject);

  return (
    <div
      className={`group w-[212px] shrink-0 bg-white rounded-xl overflow-hidden transition-shadow hover:shadow-[0_2px_4px_rgba(15,23,42,.05),0_8px_24px_rgba(15,23,42,.07)] ${
        picked ? "border-2 border-indigo-600" : "border border-slate-200"
      }`}
    >
      <div className="relative">
        <AssetThumb asset={asset} real={real} tall={tall} />

        {picked && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" /></svg>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-white via-white/90 to-transparent">
          <button className="flex-1 h-[30px] rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 5v14M5 12h14" /></svg>
            {picked ? "담김" : "담기"}
          </button>
          <button className="w-[30px] h-[30px] rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6M10 14L21 3M21 14v7H3V3h7" /></svg>
          </button>
        </div>
      </div>

      <div className="px-3.5 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13px] font-semibold text-slate-800">{asset.name}</span>
          {real ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700 shrink-0">
              <span className="w-[5px] h-[5px] rounded-full bg-green-500" />실물
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 shrink-0">
              <span className="w-[5px] h-[5px] rounded-full bg-amber-500" />대체본
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${source.className}`}>{source.label}</span>
          {picked && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">담김 · {asset.inProject}</span>}
        </div>
      </div>
    </div>
  );
}

export function AssetUploadCard() {
  return (
    <div className="w-[212px] shrink-0 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-slate-400 hover:text-slate-500 transition-colors">
      <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      <span className="text-xs">실물 파일 올리기</span>
    </div>
  );
}
