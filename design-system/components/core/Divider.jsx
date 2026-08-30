import React from 'react';

export function Divider({inset=0,tone='hairline',thick=false,style,...rest}){
  const C={hairline:'var(--border-hairline)',default:'var(--border-default)'};
  return <div role="separator" style={{height:thick?8:1,marginLeft:inset,background:thick?'var(--surface-app)':C[tone],...style}} {...rest}/>;
}
