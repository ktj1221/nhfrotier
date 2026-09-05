import fs from "node:fs";
import path from "node:path";
import type { Asset } from "../data";

/**
 * public/ 아래에 실물 파일이 있는지 확인한다.
 * 없으면 카드는 대체본을 그리고 "대체본" 배지를 단다.
 */
export function assetFileExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

const PHONE = "w-[104px] h-[154px] bg-white rounded-t-[14px] border border-slate-200 border-b-0";

function Art({ asset }: { asset: Asset }) {
  switch (asset.art) {
    case "wordmark":
      return <span className="text-[19px] font-extrabold text-slate-800 tracking-[-0.04em]">{asset.word}</span>;

    case "symbol":
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="21" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M17 32V16l14 16V16" stroke="#94a3b8" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "button":
      return (
        <div className="flex flex-col gap-2">
          <div className="w-32 h-[34px] rounded-[14px] bg-[#0B8478] text-white text-xs font-semibold flex items-center justify-center">확인</div>
          <div className="w-32 h-[34px] rounded-[14px] bg-[#E7F5F2] text-[#076A61] text-xs font-semibold flex items-center justify-center">취소</div>
        </div>
      );

    case "card":
      return (
        <div className="w-[148px] bg-white rounded-[20px] shadow-[0_1px_2px_rgba(14,20,20,.04),0_4px_12px_rgba(14,20,20,.05)] px-3.5 py-3">
          <div className="text-[10px] text-[#6E7878]">입출금통장</div>
          <div className="text-[15px] font-bold text-[#0E1414] tracking-[-0.02em] mt-0.5">1,284,300원</div>
          <div className="flex gap-1.5 mt-2">
            <div className="flex-1 h-[22px] rounded-full bg-[#F4F6F6]" />
            <div className="flex-1 h-[22px] rounded-full bg-[#F4F6F6]" />
          </div>
        </div>
      );

    case "textfield":
      return (
        <div className="flex flex-col gap-[7px]">
          <div className="w-[148px] h-[38px] rounded-xl border-[1.5px] border-[#0B8478] bg-white flex items-center px-[11px]">
            <span className="text-[11px] text-[#0E1414]">홍길동</span>
            <span className="w-px h-[13px] bg-[#0B8478] ml-px" />
          </div>
          <div className="w-[148px] h-[38px] rounded-xl border-[1.5px] border-[#DBE1E1] bg-white flex items-center px-[11px]">
            <span className="text-[11px] text-[#98A2A2]">계좌번호 입력</span>
          </div>
        </div>
      );

    case "menugrid":
      return (
        <div className="grid grid-cols-4 gap-2.5 w-[156px]">
          {["#DDEDFD", "#FFE0CB", "#E8F5D9", "#E9E7FD"].map((c) => (
            <div key={c} className="flex flex-col items-center gap-1">
              <div className="w-[30px] h-[30px] rounded-[14px]" style={{ background: c }} />
              <div className="w-5 h-1 rounded-full bg-[#DBE1E1]" />
            </div>
          ))}
        </div>
      );

    case "bottomnav":
      return (
        <div className="w-[156px] h-[46px] rounded-2xl bg-white shadow-[0_-1px_20px_rgba(14,20,20,.07)] grid grid-cols-4 items-center">
          {[true, false, false, false].map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-[3px]">
              <div className={`w-[15px] h-[15px] rounded-[5px] ${active ? "bg-[#0B8478]" : "bg-[#C0C8C8]"}`} />
              <div className={`w-3.5 h-[3px] rounded-full ${active ? "bg-[#0B8478]" : "bg-[#DBE1E1]"}`} />
            </div>
          ))}
        </div>
      );

    case "screen-home":
      return (
        <div className={`${PHONE} px-[9px] pt-2.5`}>
          <div className="h-[30px] rounded-[10px] bg-[#0B8478] mb-[7px]" />
          <div className="grid grid-cols-4 gap-1 mb-[7px]">
            {["#DDEDFD", "#FFE0CB", "#E8F5D9", "#E9E7FD"].map((c) => (
              <div key={c} className="h-4 rounded-md" style={{ background: c }} />
            ))}
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="h-[22px] rounded-lg bg-[#F4F6F6]" />
            <div className="h-[22px] rounded-lg bg-[#F4F6F6]" />
            <div className="h-[22px] rounded-lg bg-[#F4F6F6]" />
          </div>
        </div>
      );

    case "screen-login":
      return (
        <div className={`${PHONE} px-3 pt-4 flex flex-col items-center gap-[9px]`}>
          <div className="w-[34px] h-[34px] rounded-xl bg-[#E7F5F2]" />
          <div className="w-[62px] h-1.5 rounded-full bg-[#DBE1E1]" />
          <div className="flex gap-[7px] mt-1">
            {[true, true, false, false].map((filled, i) => (
              <div key={i} className={`w-[9px] h-[9px] rounded-full ${filled ? "bg-[#0B8478]" : "bg-[#DBE1E1]"}`} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 w-full mt-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3.5 rounded-[5px] bg-[#F4F6F6]" />
            ))}
          </div>
        </div>
      );

    case "screen-menu":
      return (
        <div className={`${PHONE} px-[9px] pt-[11px]`}>
          <div className="h-2 w-10 rounded-full bg-[#DBE1E1] mb-[9px]" />
          <div className="grid grid-cols-3 gap-[5px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-[26px] rounded-lg bg-[#F4F6F6]" />
            ))}
          </div>
        </div>
      );

    case "screen-corp":
      return (
        <div className="w-[172px] h-[118px] bg-white rounded-lg border border-slate-200 p-2">
          <div className="h-[13px] rounded bg-blue-800 mb-1.5" />
          <div className="grid grid-cols-3 gap-[5px] mb-1.5">
            <div className="h-[26px] rounded bg-blue-50" />
            <div className="h-[26px] rounded bg-slate-100" />
            <div className="h-[26px] rounded bg-slate-100" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-[9px] rounded-[3px] bg-slate-100" />
            <div className="h-[9px] rounded-[3px] bg-slate-100" />
            <div className="h-[9px] rounded-[3px] bg-slate-100" />
          </div>
        </div>
      );
  }
}

export function AssetThumb({ asset, real, tall }: { asset: Asset; real: boolean; tall?: boolean }) {
  const frame = tall
    ? "h-[168px] bg-slate-100 flex items-end justify-center pt-3.5"
    : "h-[104px] bg-slate-50 border-b border-slate-100 flex items-center justify-center";

  if (real) {
    return (
      <div className={frame}>
        {/* 실물 파일은 규격이 제각각이고 로컬에 임의로 떨궈지므로 next/image의 사전 최적화 대상이 아니다 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset.src} alt={asset.name} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Art asset={asset} />
    </div>
  );
}
