import React from 'react';

export function Chip({selected=false,leadingIcon,onClick,children,style,...rest}){
  const [pressed,setPressed]=React.useState(false);
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{display:'inline-flex',alignItems:'center',gap:'var(--sp-3)',height:40,padding:'0 16px',
        borderRadius:'var(--r-chip)',cursor:'pointer',whiteSpace:'nowrap',
        fontSize:'var(--fs-body-sm)',fontWeight:'var(--fw-semibold)',letterSpacing:'var(--ls-body)',
        transition:'transform var(--dur-fast) var(--ease-standard),background var(--dur-fast),color var(--dur-fast)',
        transform:pressed?'scale(var(--press-scale))':'scale(1)',
        background:selected?'var(--surface-inverse)':'var(--surface-card)',
        color:selected?'var(--text-on-inverse)':'var(--text-body)',
        border:selected?'1px solid var(--surface-inverse)':'1px solid var(--border-default)',...style}} {...rest}>
      {leadingIcon}{children}
    </button>
  );
}
