import React from 'react';

export function Toast({open=true,message,tone='inverse',icon,style,...rest}){
  if(!open) return null;
  const TONES={
    inverse:{background:'rgba(14,20,20,.92)',color:'#fff'},
    success:{background:'var(--success)',color:'#fff'},
    danger:{background:'var(--danger)',color:'#fff'}
  };
  return (
    <div role="status" style={{position:'absolute',left:'var(--gutter)',right:'var(--gutter)',bottom:'calc(var(--bottomnav-h) + 16px)',
      display:'flex',alignItems:'center',gap:'var(--sp-6)',padding:'var(--sp-7) var(--sp-10)',
      borderRadius:'var(--r-md)',zIndex:60,
      fontSize:'var(--fs-body-sm)',fontWeight:'var(--fw-medium)',
      animation:'naru-toast-in var(--dur-base) var(--ease-decel)',
      ...TONES[tone],...style}} {...rest}>
      {icon}<span style={{flex:1}}>{message}</span>
    </div>
  );
}
