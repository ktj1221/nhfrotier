import React from 'react';

export function Banner({tone='brand',eyebrow,title,description,media,action,onClick,style,...rest}){
  const TONES={
    brand:{background:'var(--surface-brand-soft)',color:'var(--text-strong)'},
    accent:{background:'var(--surface-accent-soft)',color:'var(--text-strong)'},
    neutral:{background:'var(--ink-100)',color:'var(--text-strong)'},
    inverse:{background:'var(--surface-inverse)',color:'var(--text-on-inverse)'},
    solid:{background:'var(--action-primary)',color:'var(--text-on-brand)'}
  };
  const [pressed,setPressed]=React.useState(false);
  return (
    <div onClick={onClick} role={onClick?'button':undefined}
      onPointerDown={()=>onClick&&setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{display:'flex',alignItems:'center',gap:'var(--sp-8)',padding:'var(--sp-10) var(--sp-12)',
        borderRadius:'var(--r-card)',cursor:onClick?'pointer':'default',
        transform:pressed?'scale(.99)':'scale(1)',transition:'transform var(--dur-fast) var(--ease-standard)',
        ...TONES[tone],...style}} {...rest}>
      <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:'var(--sp-2)'}}>
        {eyebrow&&<span style={{fontSize:'var(--fs-caption)',color:'inherit',opacity:.62}}>{eyebrow}</span>}
        {title&&<span style={{fontSize:'var(--fs-body-lg)',fontWeight:'var(--fw-bold)',letterSpacing:'var(--ls-title)',
          lineHeight:'var(--lh-snug)',textWrap:'pretty'}}>{title}</span>}
        {description&&<span style={{fontSize:'var(--fs-body-sm)',opacity:.7}}>{description}</span>}
      </div>
      {media&&<span style={{flex:'none',display:'flex',alignItems:'center'}}>{media}</span>}
      {action}
    </div>
  );
}
