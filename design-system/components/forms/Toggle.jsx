import React from 'react';

export function Toggle({checked=false,onChange,label,size='md',disabled=false,style,...rest}){
  const W=size==='sm'?44:52,H=size==='sm'?26:30,K=H-6;
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled}
      onClick={()=>!disabled&&onChange&&onChange(!checked)}
      style={{display:'inline-flex',alignItems:'center',gap:'var(--sp-5)',border:'none',background:'transparent',padding:0,cursor:disabled?'default':'pointer',opacity:disabled?.5:1,...style}} {...rest}>
      {label&&<span style={{fontSize:'var(--fs-body-sm)',fontWeight:'var(--fw-semibold)',color:'var(--text-body)'}}>{label}</span>}
      <span style={{position:'relative',width:W,height:H,borderRadius:'var(--r-pill)',flex:'none',
        background:checked?'var(--action-primary)':'var(--ink-300)',
        transition:'background var(--dur-base) var(--ease-standard)'}}>
        <span style={{position:'absolute',top:3,left:checked?W-K-3:3,width:K,height:K,borderRadius:'var(--r-pill)',
          background:'#fff',boxShadow:'0 1px 3px rgba(14,20,20,.28)',
          transition:'left var(--dur-base) var(--ease-spring)'}}/>
      </span>
    </button>
  );
}
