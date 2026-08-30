import React from 'react';

export function SectionHeader({title,action,onAction,size='md',style,...rest}){
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'var(--sp-6)',
      padding:'0 0 var(--sp-8)',...style}} {...rest}>
      <h2 onClick={onAction} style={{margin:0,display:'flex',alignItems:'center',gap:'var(--sp-2)',
        cursor:onAction?'pointer':'default',
        fontSize:size==='lg'?'var(--fs-title-2)':'var(--fs-title-3)',fontWeight:'var(--fw-bold)',
        letterSpacing:'var(--ls-title)',color:'var(--text-strong)'}}>
        {title}
        {onAction&&<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </h2>
      {action&&<span style={{fontSize:'var(--fs-caption)',fontWeight:'var(--fw-semibold)',color:'var(--text-muted)',cursor:'pointer'}}>{action}</span>}
    </div>
  );
}
