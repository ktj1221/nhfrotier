import React from 'react';

const GRID_SHAPES={squircle:'30%',circle:'var(--r-pill)',rounded:'22%'};

export function MenuGrid({items=[],columns=4,size=44,onSelect,style,...rest}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat('+columns+',1fr)',
      rowGap:'var(--sp-14)',columnGap:'var(--sp-4)',...style}} {...rest}>
      {items.map(it=><MenuGridItem key={it.id} item={it} size={size} onSelect={onSelect}/>)}
    </div>
  );
}

function MenuGridItem({item,size,onSelect}){
  const [pressed,setPressed]=React.useState(false);
  const a=item.accent;
  const b=Math.round(size*0.46);
  return (
    <button type="button" onClick={()=>onSelect&&onSelect(item.id)}
      onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'var(--sp-6)',
        border:'none',background:'transparent',padding:0,cursor:'pointer',minWidth:0,
        transform:pressed?'scale(var(--press-scale))':'scale(1)',
        transition:'transform var(--dur-fast) var(--ease-standard)'}}>
      <span style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center',
        width:size,height:size,flex:'none',
        borderRadius:GRID_SHAPES[item.shape]||GRID_SHAPES.squircle,
        background:item.bg||'var(--ink-200)',color:item.color||'#fff'}}>
        {item.icon}
        {a&&<span style={{position:'absolute',right:-b*0.3,bottom:-b*0.3,
          width:b,height:b,borderRadius:'var(--r-pill)',
          background:a.bg||'var(--action-primary)',color:a.color||'#fff',
          boxShadow:'0 0 0 2.5px var(--surface-card)',
          display:'flex',alignItems:'center',justifyContent:'center'}}>{a.icon}</span>}
      </span>
      <span style={{width:'100%',fontSize:'var(--fs-caption)',fontWeight:'var(--fw-medium)',letterSpacing:'var(--ls-body)',
        color:'var(--text-body)',textAlign:'center',lineHeight:'var(--lh-snug)',
        wordBreak:'normal',overflowWrap:'anywhere'}}>{item.label}</span>
    </button>
  );
}
