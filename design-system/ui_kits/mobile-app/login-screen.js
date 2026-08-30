const DS=()=>window.YeoulBankDesignSystem_073d1f||{};
const Button=props=>React.createElement(DS().Button,props,props&&props.children);
const IconButton=props=>React.createElement(DS().IconButton,props,props&&props.children);
const Icon=props=>React.createElement(DS().Icon,props,props&&props.children);
const Keypad=props=>React.createElement(DS().Keypad,props,props&&props.children);
const PinDots=props=>React.createElement(DS().PinDots,props,props&&props.children);
const TabBar=props=>React.createElement(DS().TabBar,props,props&&props.children);
const Toast=props=>React.createElement(DS().Toast,props,props&&props.children);

function LoginScreen({onSuccess}){
  const [mode,setMode]=React.useState('pin');
  const [pin,setPin]=React.useState('');
  const [error,setError]=React.useState(false);
  const [toast,setToast]=React.useState('');

  React.useEffect(()=>{
    if(pin.length===6){
      const ok=pin==='111111'||true;
      const t=setTimeout(()=>{ if(ok){onSuccess&&onSuccess();} else {setError(true);setPin('');} },220);
      return ()=>clearTimeout(t);
    }
  },[pin]);

  const key=k=>{
    setError(false);
    if(k==='⌫') setPin(p=>p.slice(0,-1));
    else if(k==='재배열') setToast('키패드를 다시 배열했어요');
    else setPin(p=>(p+k).slice(0,6));
  };

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:'var(--surface-card)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px 0'}}>
        <IconButton label="닫기"><Icon name="x" size={22}/></IconButton>
        <IconButton label="고객센터"><Icon name="headset" size={20}/></IconButton>
      </div>

      <div style={{padding:'12px 20px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
        <span style={{fontSize:30,fontWeight:800,letterSpacing:'-.045em',color:'var(--teal-600)'}}>나루뱅크</span>
      </div>

      <div style={{padding:'20px 20px 0',display:'flex',justifyContent:'center'}}>
        <TabBar variant="segmented" value={mode} onChange={setMode}
          tabs={[{id:'pin',label:'간편비밀번호'},{id:'cert',label:'인증서'}]}/>
      </div>

      {mode==='pin'?(
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26,padding:'0 20px'}}>
          <span style={{fontSize:'var(--fs-title-3)',fontWeight:700,letterSpacing:'var(--ls-title)',
            color:error?'var(--danger)':'var(--text-strong)',textAlign:'center'}}>
            {error?'비밀번호가 맞지 않아요':'간편비밀번호 6자리를 입력해주세요'}</span>
          <PinDots length={6} filled={pin.length} error={error}/>
          <button type="button" onClick={()=>setToast('생체인증을 사용할 수 없어요')}
            style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,border:'none',background:'transparent',cursor:'pointer',marginTop:8}}>
            <span style={{width:56,height:56,borderRadius:'var(--r-pill)',background:'var(--surface-brand-soft)',
              display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="fingerprint" size={28} color="var(--teal-600)"/></span>
            <span style={{fontSize:'var(--fs-caption)',color:'var(--text-muted)'}}>생체인증</span>
          </button>
        </div>
      ):(
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:'0 28px',textAlign:'center'}}>
          <Icon name="shield-check" size={44} color="var(--ink-300)"/>
          <span style={{fontSize:'var(--fs-title-3)',fontWeight:700,color:'var(--text-strong)'}}>나루인증서로 로그인</span>
          <span style={{fontSize:'var(--fs-body-sm)',color:'var(--text-muted)',lineHeight:'var(--lh-normal)'}}>
            이 기기에 저장된 인증서로 바로 로그인할 수 있어요</span>
          <Button variant="primary" size="xl" block onClick={onSuccess} style={{marginTop:8}}>인증서로 로그인</Button>
        </div>
      )}

      <div style={{display:'flex',justifyContent:'center',gap:20,padding:'0 20px 16px'}}>
        {['비밀번호 재설정','다른 방법으로 로그인'].map(l=>
          <button key={l} type="button" onClick={()=>setToast(l+' 화면으로 이동해요')}
            style={{border:'none',background:'transparent',cursor:'pointer',padding:'8px 0',
              fontSize:'var(--fs-caption)',color:'var(--text-muted)',textDecoration:'underline',textUnderlineOffset:3}}>{l}</button>)}
      </div>

      {mode==='pin'&&<Keypad shuffle variant="secure" onKey={key}/>}
      <Toast open={!!toast} message={toast} style={{bottom:mode==='pin'?260:24}}/>
      {toast&&<TimedClear onDone={()=>setToast('')}/>}
    </div>
  );
}

function TimedClear({onDone}){
  React.useEffect(()=>{const t=setTimeout(onDone,1800);return ()=>clearTimeout(t);},[]);
  return null;
}

Object.assign(window,{LoginScreen});
