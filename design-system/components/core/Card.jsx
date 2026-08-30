import React from 'react';

export function Card({padding='var(--card-pad)',tone='card',interactive=false,onClick,children,style,...rest}){
  const [pressed,setPressed]=React.useState(false);
  const TONES={
    card:{background:'var(--surface-card)',boxShadow:'var(--shadow-card)'},
    flat:{background:'var(--surface-card)',boxShadow:'none',border:'1px solid var(--border-hairline)'},
    sunken:{background:'var(--surface-sunken)',boxShadow:'none'},
    brand:{background:'var(--surface-brand-soft)',boxShadow:'none'},
    accent:{background:'var(--surface-accent-soft)',boxShadow:'none'},
    inverse:{background:'var(--surface-inverse)',boxShadow:'none',color:'var(--text-on-inverse)'}
  };
  return (
    <div onClick={onClick} role={interactive?'button':undefined}
      onPointerDown={()=>interactive&&setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{borderRadius:'var(--r-card)',padding,
        transition:'transform var(--dur-fast) var(--ease-standard)',
        transform:pressed?'scale(.985)':'scale(1)',cursor:interactive?'pointer':'default',
        ...TONES[tone],...style}} {...rest}>{children}</div>
  );
}
