import React from 'react';

export function PinDots({length=6,filled=0,error=false,style,...rest}){
  return (
    <div style={{display:'flex',gap:'var(--sp-10)',justifyContent:'center',
      animation:error?'naru-shake 320ms var(--ease-standard)':'none',...style}} {...rest}>
      {Array.from({length}).map((_,i)=>(
        <span key={i} style={{width:14,height:14,borderRadius:'var(--r-pill)',
          background:i<filled?(error?'var(--danger)':'var(--action-primary)'):'var(--ink-200)',
          transform:i<filled?'scale(1)':'scale(.86)',
          transition:'background var(--dur-fast),transform var(--dur-fast) var(--ease-spring)'}}/>
      ))}
    </div>
  );
}
