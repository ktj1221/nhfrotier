import React from 'react';

const BADGE_TONES={
  neutral:{background:'var(--ink-100)',color:'var(--ink-600)'},
  brand:{background:'var(--surface-brand-soft)',color:'var(--teal-600)'},
  accent:{background:'var(--amber-50)',color:'var(--amber-600)'},
  success:{background:'var(--success-bg)',color:'var(--success)'},
  warning:{background:'var(--warning-bg)',color:'var(--warning)'},
  danger:{background:'var(--danger-bg)',color:'var(--danger)'},
  info:{background:'var(--info-bg)',color:'var(--info)'},
  solid:{background:'var(--action-primary)',color:'var(--text-on-brand)'}
};

export function Badge({tone='neutral',size='md',children,style,...rest}){
  const sm=size==='sm';
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:'var(--sp-2)',
      height:sm?20:24,padding:sm?'0 6px':'0 8px',borderRadius:'var(--r-xs)',
      fontSize:sm?'var(--fs-micro)':'var(--fs-caption)',fontWeight:'var(--fw-semibold)',
      letterSpacing:'var(--ls-body)',whiteSpace:'nowrap',...BADGE_TONES[tone],...style}} {...rest}>{children}</span>
  );
}
