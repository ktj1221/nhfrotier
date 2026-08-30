import React from 'react';

export function TabBar({tabs=[],value,onChange,variant='underline',style,...rest}){
  return (
    <div role="tablist" style={{display:'flex',gap:variant==='underline'?'var(--sp-12)':'var(--sp-4)',
      borderBottom:variant==='underline'?'1px solid var(--border-hairline)':'none',...style}} {...rest}>
      {tabs.map(t=>{
        const on=t.id===value;
        return (
          <button key={t.id} role="tab" aria-selected={on} type="button" onClick={()=>onChange&&onChange(t.id)}
            style={{position:'relative',border:'none',background:variant==='segmented'?(on?'var(--surface-inverse)':'var(--ink-100)'):'transparent',
              color:variant==='segmented'?(on?'var(--text-on-inverse)':'var(--text-muted)'):(on?'var(--text-strong)':'var(--text-subtle)'),
              padding:variant==='segmented'?'0 16px':'0 0 12px',height:variant==='segmented'?36:'auto',
              borderRadius:variant==='segmented'?'var(--r-pill)':0,cursor:'pointer',
              fontSize:'var(--fs-body-lg)',fontWeight:on?'var(--fw-bold)':'var(--fw-medium)',
              letterSpacing:'var(--ls-title)',transition:'color var(--dur-fast),background var(--dur-fast)'}}>
            {t.label}
            {variant==='underline'&&<span style={{position:'absolute',left:0,right:0,bottom:-1,height:2,borderRadius:2,
              background:on?'var(--text-strong)':'transparent',transition:'background var(--dur-fast)'}}/>}
          </button>
        );
      })}
    </div>
  );
}
