import React from 'react';

export function Icon({name,size=24,color='currentColor',strokeish=false,style,...rest}){
  return <i aria-hidden className={'naru-icon icon-'+name}
    style={{fontSize:size,width:size,height:size,color,
      fontWeight:strokeish?600:400,...style}} {...rest}/>;
}
