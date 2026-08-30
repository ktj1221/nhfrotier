import React from 'react';

export function TextField({label,value,onChange,placeholder,helper,error,suffix,prefix,type='text',inputMode,disabled=false,style,...rest}){
  const [focus,setFocus]=React.useState(false);
  const border=error?'var(--danger)':focus?'var(--border-focus)':'var(--border-default)';
  return (
    <label style={{display:'flex',flexDirection:'column',gap:'var(--sp-4)',...style}}>
      {label&&<span style={{fontSize:'var(--fs-caption)',fontWeight:'var(--fw-semibold)',color:'var(--text-muted)'}}>{label}</span>}
      <span style={{display:'flex',alignItems:'center',gap:'var(--sp-4)',height:52,padding:'0 16px',
        background:disabled?'var(--ink-50)':'var(--surface-card)',
        border:'1px solid '+border,borderRadius:'var(--r-field)',
        boxShadow:focus?'0 0 0 3px rgba(11,132,120,.14)':'none',
        transition:'border-color var(--dur-fast),box-shadow var(--dur-fast)'}}>
        {prefix}
        <input type={type} inputMode={inputMode} value={value} placeholder={placeholder} disabled={disabled}
          onChange={e=>onChange&&onChange(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{flex:1,minWidth:0,border:'none',outline:'none',background:'transparent',
            fontFamily:'var(--font-sans)',fontSize:'var(--fs-body-lg)',fontWeight:'var(--fw-medium)',
            letterSpacing:'var(--ls-body)',color:'var(--text-strong)'}} {...rest}/>
        {suffix}
      </span>
      {(error||helper)&&<span style={{fontSize:'var(--fs-caption)',color:error?'var(--danger)':'var(--text-muted)'}}>{error||helper}</span>}
    </label>
  );
}
