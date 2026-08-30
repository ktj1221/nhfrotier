import React from 'react';

export function AppBar({title,leading,actions,align='center',transparent=false,style,...rest}){
  return (
    <header style={{display:'flex',alignItems:'center',gap:'var(--sp-4)',height:'var(--appbar-h)',
      padding:'0 8px 0 4px',flex:'none',
      background:transparent?'transparent':'var(--surface-card)',...style}} {...rest}>
      <span style={{display:'flex',width:44,justifyContent:'center',flex:'none'}}>{leading}</span>
      <h1 style={{flex:1,margin:0,textAlign:align,
        fontSize:'var(--fs-body-lg)',fontWeight:'var(--fw-bold)',letterSpacing:'var(--ls-title)',
        color:'var(--text-strong)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</h1>
      <span style={{display:'flex',alignItems:'center',gap:'var(--sp-1)',flex:'none',minWidth:44,justifyContent:'flex-end'}}>{actions}</span>
    </header>
  );
}
