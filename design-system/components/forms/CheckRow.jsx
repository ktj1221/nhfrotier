import React from 'react';

export function CheckRow({checked=false,onChange,children,emphasis=false,trailing,style,...rest}){
  return (
    <div onClick={()=>onChange&&onChange(!checked)}
      style={{display:'flex',alignItems:'center',gap:'var(--sp-6)',minHeight:'var(--tap-min)',cursor:'pointer',...style}} {...rest}>
      <span aria-hidden style={{width:22,height:22,flex:'none',borderRadius:'var(--r-pill)',
        display:'inline-flex',alignItems:'center',justifyContent:'center',
        background:checked?'var(--action-primary)':'transparent',
        border:checked?'1px solid var(--action-primary)':'1px solid var(--border-strong)',
        transition:'background var(--dur-fast),border-color var(--dur-fast)'}}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2l2.4 2.4L9.5 4" stroke={checked?'#fff':'var(--ink-300)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <span style={{flex:1,fontSize:'var(--fs-body-sm)',color:'var(--text-body)',
        fontWeight:emphasis?'var(--fw-semibold)':'var(--fw-regular)'}}>{children}</span>
      {trailing}
    </div>
  );
}
