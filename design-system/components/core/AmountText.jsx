import React from 'react';

const AMT_SIZES={sm:'var(--fs-amount-sm)',md:'var(--fs-amount)',hero:'var(--fs-amount-hero)'};

export function AmountText({value,unit='원',size='md',direction,signed=false,masked=false,style,...rest}){
  const DIR={up:'var(--money-up)',down:'var(--money-down)',flat:'var(--money-flat)'};
  const n=typeof value==='number'?Math.abs(value).toLocaleString('ko-KR'):value;
  const sign=signed&&typeof value==='number'?(value>0?'+':value<0?'-':''):'';
  return (
    <span className="naru-num" style={{display:'inline-flex',alignItems:'baseline',gap:'var(--sp-2)',
      fontSize:AMT_SIZES[size],fontWeight:'var(--fw-bold)',lineHeight:'var(--lh-tight)',
      color:direction?DIR[direction]:'var(--text-strong)',...style}} {...rest}>
      <span>{masked?'•••••':sign+n}</span>
      {unit&&<span style={{fontSize:'0.72em',fontWeight:'var(--fw-semibold)'}}>{unit}</span>}
    </span>
  );
}
