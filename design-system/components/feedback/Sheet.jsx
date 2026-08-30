import React from 'react';

export function Sheet({open=true,title,onClose,dismissLabel='닫기',secondaryLabel,onSecondary,footer,children,style,...rest}){
  if(!open) return null;
  return (
    <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'flex-end',zIndex:40}}>
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'var(--surface-scrim)',
        animation:'naru-fade var(--dur-base) var(--ease-standard)'}}/>
      <div role="dialog" aria-modal="true" style={{position:'relative',background:'var(--surface-sheet)',
        borderRadius:'var(--r-sheet) var(--r-sheet) 0 0',boxShadow:'var(--shadow-sheet)',
        padding:'var(--sp-10) var(--gutter) var(--sp-8)',maxHeight:'86%',overflow:'auto',
        animation:'naru-sheet-in var(--dur-sheet) var(--ease-decel)',...style}} {...rest}>
        {title&&<h2 style={{margin:'0 0 var(--sp-8)',fontSize:'var(--fs-title-2)',fontWeight:'var(--fw-bold)',
          letterSpacing:'var(--ls-title)',color:'var(--text-strong)'}}>{title}</h2>}
        {children}
        {footer}
        {(onClose||onSecondary)&&<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
          paddingTop:'var(--sp-10)',marginTop:'var(--sp-6)'}}>
          <button type="button" onClick={onSecondary} style={{border:'none',background:'transparent',padding:0,
            cursor:'pointer',visibility:secondaryLabel?'visible':'hidden',
            fontSize:'var(--fs-body-sm)',color:'var(--text-muted)'}}>{secondaryLabel||'·'}</button>
          <button type="button" onClick={onClose} style={{border:'none',background:'transparent',padding:0,cursor:'pointer',
            fontSize:'var(--fs-body-sm)',fontWeight:'var(--fw-semibold)',color:'var(--text-body)'}}>{dismissLabel}</button>
        </div>}
      </div>
    </div>
  );
}
