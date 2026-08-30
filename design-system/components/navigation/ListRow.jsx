import React from 'react';

export function ListRow({icon,title,subtitle,trailing,chevron=false,onClick,dense=false,style,...rest}){
  const [pressed,setPressed]=React.useState(false);
  return (
    <div role={onClick?'button':undefined} onClick={onClick}
      onPointerDown={()=>onClick&&setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{display:'flex',alignItems:'center',gap:'var(--sp-6)',
        minHeight:dense?48:'var(--row-h)',padding:dense?'var(--sp-4) 0':'var(--sp-6) 0',
        cursor:onClick?'pointer':'default',
        background:pressed?'var(--overlay-press)':'transparent',
        transition:'background var(--dur-instant)',...style}} {...rest}>
      {icon&&<span style={{display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,flex:'none'}}>{icon}</span>}
      <span style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:'var(--sp-1)'}}>
        <span style={{fontSize:'var(--fs-body-lg)',fontWeight:'var(--fw-semibold)',letterSpacing:'var(--ls-body)',
          color:'var(--text-strong)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</span>
        {subtitle&&<span style={{fontSize:'var(--fs-body-sm)',color:'var(--text-muted)',
          overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{subtitle}</span>}
      </span>
      {trailing}
      {chevron&&<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{flex:'none',color:'var(--ink-300)'}}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );
}
