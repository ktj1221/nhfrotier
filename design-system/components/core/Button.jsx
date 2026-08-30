import React from 'react';

const BTN_SIZES={
  sm:{height:34,padding:'0 12px',fontSize:'var(--fs-caption)',radius:'var(--r-sm)'},
  md:{height:44,padding:'0 16px',fontSize:'var(--fs-body-sm)',radius:'var(--r-button)'},
  lg:{height:52,padding:'0 20px',fontSize:'var(--fs-body-lg)',radius:'var(--r-button)'},
  xl:{height:56,padding:'0 24px',fontSize:'var(--fs-body-lg)',radius:'var(--r-lg)'}
};
const BTN_VARIANTS={
  primary:{background:'var(--action-primary)',color:'var(--text-on-brand)',border:'1px solid transparent'},
  secondary:{background:'var(--action-secondary)',color:'var(--text-strong)',border:'1px solid transparent'},
  outline:{background:'var(--surface-card)',color:'var(--text-strong)',border:'1px solid var(--border-default)'},
  ghost:{background:'transparent',color:'var(--text-brand)',border:'1px solid transparent'},
  inverse:{background:'var(--surface-inverse)',color:'var(--text-on-inverse)',border:'1px solid transparent'},
  danger:{background:'var(--danger)',color:'#fff',border:'1px solid transparent'}
};

export function Button({variant='primary',size='md',block=false,disabled=false,loading=false,leadingIcon,trailingIcon,onClick,children,style,...rest}){
  const [pressed,setPressed]=React.useState(false);
  const s=BTN_SIZES[size]||BTN_SIZES.md;
  const v=BTN_VARIANTS[variant]||BTN_VARIANTS.primary;
  const off=disabled||loading;
  return (
    <button type="button" disabled={off} onClick={onClick}
      onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'var(--sp-3)',
        width:block?'100%':'auto',minWidth:size==='sm'?0:'var(--tap-min)',height:s.height,padding:s.padding,
        fontFamily:'var(--font-sans)',fontSize:s.fontSize,fontWeight:'var(--fw-semibold)',letterSpacing:'var(--ls-body)',
        borderRadius:s.radius,cursor:off?'default':'pointer',whiteSpace:'nowrap',
        transition:'transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),opacity var(--dur-fast)',
        transform:pressed&&!off?'scale(var(--press-scale))':'scale(1)',
        ...v,
        ...(off?{background:variant==='ghost'||variant==='outline'?v.background:'var(--action-disabled)',color:'var(--action-on-disabled)',borderColor:variant==='outline'?'var(--border-hairline)':'transparent'}:null),
        ...(pressed&&!off&&variant==='primary'?{background:'var(--action-primary-press)'}:null),
        ...(pressed&&!off&&(variant==='secondary'||variant==='outline')?{background:'var(--action-secondary-press)'}:null),
        ...style}} {...rest}>
      {loading?<Spinner/>:leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}

function Spinner(){
  return <span aria-hidden style={{width:16,height:16,borderRadius:'50%',border:'2px solid currentColor',borderTopColor:'transparent',opacity:.7,animation:'naru-spin 700ms linear infinite'}}/>;
}
