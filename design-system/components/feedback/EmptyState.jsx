import React from 'react';

export function EmptyState({media,title,description,action,style,...rest}){
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'var(--sp-6)',
      padding:'var(--sp-24) var(--gutter)',textAlign:'center',...style}} {...rest}>
      {media}
      {title&&<span style={{fontSize:'var(--fs-body-lg)',fontWeight:'var(--fw-bold)',color:'var(--text-strong)'}}>{title}</span>}
      {description&&<span style={{fontSize:'var(--fs-body-sm)',color:'var(--text-muted)',lineHeight:'var(--lh-normal)',textWrap:'pretty'}}>{description}</span>}
      {action&&<span style={{marginTop:'var(--sp-4)'}}>{action}</span>}
    </div>
  );
}
