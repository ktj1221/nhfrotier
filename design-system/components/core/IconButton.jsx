import React from 'react';

export function IconButton({label,size=40,shape='circle',tone='plain',badge=false,onClick,children,style,...rest}){
  const [pressed,setPressed]=React.useState(false);
  const TONES={
    plain:{background:'transparent',color:'var(--text-strong)'},
    soft:{background:'var(--ink-100)',color:'var(--text-strong)'},
    brand:{background:'var(--surface-brand-soft)',color:'var(--text-brand)'},
    inverse:{background:'var(--surface-inverse)',color:'var(--text-on-inverse)'}
  };
  return (
    <button type="button" aria-label={label} onClick={onClick}
      onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{position:'relative',display:'inline-flex',alignItems:'center',justifyContent:'center',
        width:size,height:size,padding:0,border:'none',cursor:'pointer',
        borderRadius:shape==='circle'?'var(--r-pill)':'var(--r-icon-tile)',
        transition:'transform var(--dur-fast) var(--ease-standard),background var(--dur-fast)',
        transform:pressed?'scale(var(--press-scale))':'scale(1)',
        ...TONES[tone],...(pressed&&tone==='plain'?{background:'var(--overlay-press)'}:null),...style}} {...rest}>
      {children}
      {badge&&<span style={{position:'absolute',top:size*0.18,right:size*0.2,width:6,height:6,borderRadius:'var(--r-pill)',background:'var(--danger)'}}/>}
    </button>
  );
}
