import React from 'react';

export function Keypad({onKey,shuffle=false,variant='number',style,...rest}){
  const digits=React.useMemo(()=>{
    const d=['1','2','3','4','5','6','7','8','9'];
    if(!shuffle) return d;
    for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}
    return d;
  },[shuffle]);
  const keys=[...digits, variant==='secure'?'재배열':'', '0','⌫'];
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',background:'var(--ink-100)',gap:1,...style}} {...rest}>
      {keys.map((k,i)=><KeypadKey key={i} value={k} onKey={onKey}/>)}
    </div>
  );
}

function KeypadKey({value,onKey}){
  const [pressed,setPressed]=React.useState(false);
  const empty=value==='';
  return (
    <button type="button" disabled={empty} onClick={()=>onKey&&onKey(value)}
      onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{height:58,border:'none',cursor:empty?'default':'pointer',
        background:empty?'var(--ink-50)':pressed?'var(--ink-100)':'var(--surface-card)',
        fontFamily:'var(--font-sans)',fontVariantNumeric:'tabular-nums',
        fontSize:value.length>1?'var(--fs-body-sm)':'var(--fs-title-2)',
        fontWeight:value.length>1?'var(--fw-semibold)':'var(--fw-medium)',
        color:value.length>1?'var(--text-muted)':'var(--text-strong)',
        transition:'background var(--dur-instant)'}}>{value}</button>
  );
}
