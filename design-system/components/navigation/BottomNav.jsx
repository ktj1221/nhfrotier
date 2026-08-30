import React from 'react';

export function BottomNav({items=[],value,onChange,floating=true,style,...rest}){
  return (
    <nav style={{display:'flex',alignItems:'stretch',height:'var(--bottomnav-h)',flex:'none',
      background:'var(--surface-card)',
      borderRadius:floating?'var(--r-2xl) var(--r-2xl) 0 0':0,
      boxShadow:floating?'var(--shadow-nav)':'none',...style}} {...rest}>
      {items.map(it=>{
        const on=it.id===value;
        return (
          <button key={it.id} type="button" onClick={()=>onChange&&onChange(it.id)}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'var(--sp-2)',
              border:'none',background:'transparent',cursor:'pointer',padding:0,
              color:on?'var(--text-strong)':'var(--text-subtle)',
              transition:'color var(--dur-fast)'}}>
            <span style={{display:'flex',alignItems:'center',justifyContent:'center',height:24,opacity:on?1:.75,
              strokeWidth:on?2.2:1.8}}>{it.icon}</span>
            <span style={{fontSize:'var(--fs-micro)',fontWeight:on?'var(--fw-bold)':'var(--fw-medium)',letterSpacing:'var(--ls-body)'}}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
