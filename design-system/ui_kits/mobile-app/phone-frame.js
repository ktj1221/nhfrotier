const DS=()=>window.YeoulBankDesignSystem_073d1f||{};
const Icon=props=>React.createElement(DS().Icon,props,props&&props.children);

function StatusBar({dark=false}){
  const c=dark?'#fff':'var(--ink-900)';
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:34,padding:'0 20px',flex:'none',
      fontSize:12,fontWeight:700,color:c,letterSpacing:'-.01em'}}>
      <span style={{fontVariantNumeric:'tabular-nums'}}>1:09</span>
      <span style={{display:'flex',alignItems:'center',gap:5}}>
        <Icon name="signal" size={13} color={c}/><Icon name="wifi" size={13} color={c}/><Icon name="battery-full" size={15} color={c}/>
      </span>
    </div>
  );
}

function PhoneFrame({children,dark=false,bg='var(--surface-app)'}){
  return (
    <div style={{width:360,height:780,position:'relative',display:'flex',flexDirection:'column',
      background:bg,borderRadius:36,overflow:'hidden',boxShadow:'0 24px 70px rgba(14,20,20,.24)',
      border:'1px solid var(--border-hairline)'}}>
      <StatusBar dark={dark}/>
      <div style={{flex:1,minHeight:0,display:'flex',flexDirection:'column',position:'relative'}}>{children}</div>
    </div>
  );
}

Object.assign(window,{PhoneFrame,StatusBar});
