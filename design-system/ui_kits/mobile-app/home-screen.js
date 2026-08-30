const DS=()=>window.YeoulBankDesignSystem_073d1f||{};
const Card=props=>React.createElement(DS().Card,props,props&&props.children);
const Button=props=>React.createElement(DS().Button,props,props&&props.children);
const IconButton=props=>React.createElement(DS().IconButton,props,props&&props.children);
const Badge=props=>React.createElement(DS().Badge,props,props&&props.children);
const Banner=props=>React.createElement(DS().Banner,props,props&&props.children);
const AmountText=props=>React.createElement(DS().AmountText,props,props&&props.children);
const SectionHeader=props=>React.createElement(DS().SectionHeader,props,props&&props.children);
const MenuGrid=props=>React.createElement(DS().MenuGrid,props,props&&props.children);
const Toggle=props=>React.createElement(DS().Toggle,props,props&&props.children);
const Icon=props=>React.createElement(DS().Icon,props,props&&props.children);
const Sheet=props=>React.createElement(DS().Sheet,props,props&&props.children);
const Toast=props=>React.createElement(DS().Toast,props,props&&props.children);

const G=(name,size=22)=><Icon name={name} size={size}/>;
const A=(name,bg,size=11)=>({icon:<Icon name={name} size={size}/>,bg});
const Won=({size=22})=><span style={{fontSize:size,fontWeight:800,lineHeight:1,letterSpacing:'-.04em'}}>₩</span>;

const SHORTCUTS=()=>[
  {id:'계좌등록',label:'계좌등록',shape:'squircle',bg:'var(--obj-violet)',icon:G('file-text'),accent:A('plus','var(--obj-green)',12)},
  {id:'전체계좌',label:'전체계좌',shape:'squircle',bg:'var(--obj-blue)',icon:G('list')},
  {id:'공과금납부',label:'공과금납부',shape:'squircle',bg:'var(--obj-blue-deep)',icon:G('receipt'),accent:A('arrow-right','var(--ink-800)',11)},
  {id:'이체한도변경',label:'이체한도변경',shape:'circle',bg:'var(--obj-amber)',icon:<Won/>,accent:A('arrow-down-up','var(--obj-blue-deep)',11)},
  {id:'사장님플러스',label:'사장님+',shape:'squircle',bg:'var(--obj-teal)',icon:G('store'),accent:A('plus','var(--obj-amber)',12)},
  {id:'룰렛',label:'나루룰렛',shape:'circle',bg:'var(--obj-green)',icon:G('disc-3')},
  {id:'쿠폰몰',label:'쿠폰몰',shape:'squircle',bg:'var(--obj-pink)',icon:G('ticket'),accent:A('percent','var(--obj-gold)',11)},
  {id:'메뉴설정',label:'메뉴설정',shape:'squircle',bg:'var(--ink-200)',color:'var(--ink-500)',icon:G('plus')}
];

function HomeScreen({onOpenMenu,big,setBig}){
  const [hidden,setHidden]=React.useState(false);
  const [promo,setPromo]=React.useState(true);
  const [toast,setToast]=React.useState('');
  return (
    <div className={big?'naru-bigtext':undefined} style={{flex:1,minHeight:0,display:'flex',flexDirection:'column'}}>
      <header style={{display:'flex',alignItems:'center',gap:8,padding:'4px 12px 8px 20px',flex:'none',background:'var(--surface-app)'}}>
        <span style={{flex:1,fontSize:'var(--fs-title-3)',fontWeight:800,letterSpacing:'var(--ls-title)',color:'var(--text-strong)'}}>김나루님</span>
        <Toggle size="sm" label="큰글" checked={big} onChange={setBig}/>
        <IconButton label="지갑"><Icon name="wallet" size={22}/></IconButton>
        <IconButton label="알림" badge><Icon name="bell" size={22}/></IconButton>
        <IconButton label="전체메뉴" onClick={onOpenMenu}><Icon name="menu" size={22}/></IconButton>
      </header>

      <div style={{flex:1,minHeight:0,overflowY:'auto',padding:'0 var(--gutter) 20px',display:'flex',flexDirection:'column',gap:'var(--card-gap)'}}>
        <Banner tone="brand" eyebrow="중요한 일을 기다리고 있다면?" title="운세 확인하고 포인트도 받자☆"
          media={<Icon name="clover" size={40} color="var(--teal-400)"/>} onClick={()=>setToast('오늘의 운세로 이동해요')}/>

        <div style={{display:'flex',alignItems:'baseline',gap:10,paddingTop:12}}>
          <span style={{fontSize:'var(--fs-title-3)',fontWeight:800,color:'var(--text-strong)',letterSpacing:'var(--ls-title)'}}>나루은행</span>
          <span style={{fontSize:'var(--fs-title-3)',fontWeight:700,color:'var(--text-subtle)'}}>다른금융</span>
        </div>

        <Card>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{width:44,height:44,borderRadius:'var(--r-pill)',background:'var(--teal-500)',color:'#fff',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,letterSpacing:'-.03em'}}>나루</span>
            <span style={{flex:1,minWidth:0}}>
              <span style={{display:'block',fontSize:'var(--fs-body-lg)',fontWeight:700,color:'var(--text-strong)'}}>나루 주거래우대통장</span>
              <span style={{display:'block',fontSize:'var(--fs-body-sm)',color:'var(--text-muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>나루은행 302-2212-1373-21 <u style={{cursor:'pointer'}} onClick={()=>setToast('계좌번호를 복사했어요')}>복사</u></span>
            </span>
            <IconButton label="더보기" size={32}><Icon name="ellipsis-vertical" size={18} color="var(--ink-400)"/></IconButton>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'22px 0 20px',justifyContent:'center'}}>
            <AmountText value={1175776} masked={hidden}/>
            <button type="button" onClick={()=>setHidden(h=>!h)} style={{height:30,padding:'0 12px',borderRadius:'var(--r-pill)',flex:'none',
              border:'1px solid var(--border-default)',background:'transparent',cursor:'pointer',whiteSpace:'nowrap',
              fontSize:'var(--fs-caption)',color:'var(--text-muted)'}}>{hidden?'보기':'숨김'}</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            {['ATM출금','거래내역','이체'].map(l=><Button key={l} variant="outline" size="md" onClick={()=>setToast(l+' 화면으로 이동해요')}>{l}</Button>)}
          </div>
        </Card>

        <Banner tone="neutral" title="뚜레쥬르 x 요기요" description="8/24-8/31 포장 50%"
          action={<Button size="sm" variant="inverse">바로가기</Button>}
          media={<span style={{fontSize:22,fontWeight:800,color:'var(--rose-600)',letterSpacing:'-.03em'}}>50%</span>}/>

        <SectionHeader title="자주 쓰는 메뉴" style={{paddingTop:16}}/>
        <Card>
          <MenuGrid onSelect={id=>setToast(id+' 화면으로 이동해요')} items={SHORTCUTS()}/>
        </Card>

        <SectionHeader title="내 모임" onAction={()=>setToast('모임 목록으로 이동해요')} style={{paddingTop:16}}/>
        <Card>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{width:40,height:40,borderRadius:'var(--r-icon-tile)',background:'var(--amber-50)',
              display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="users" size={20} color="var(--amber-600)"/></span>
            <span style={{flex:1,fontSize:'var(--fs-body-lg)',fontWeight:700,color:'var(--text-strong)'}}>나루 광운대 동문회</span>
            <Badge tone="neutral">16명</Badge>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:16}}>
            <AmountText value={265000} size="sm"/>
            <Button size="sm" variant="outline">모임 홈</Button>
          </div>
        </Card>
      </div>

      <Sheet open={promo} onClose={()=>setPromo(false)} secondaryLabel="1일동안 안보기" onSecondary={()=>setPromo(false)}>
        <Badge tone="info">오늘의 혜택</Badge>
        <div style={{marginTop:14,display:'flex',alignItems:'center',gap:12}}>
          <div style={{flex:1}}>
            <div style={{fontSize:'var(--fs-title-1)',fontWeight:800,letterSpacing:'var(--ls-title)',lineHeight:1.3,color:'var(--text-strong)'}}>요즘 핫한 이벤트<br/>보기만 해도 포인트를!</div>
            <div style={{marginTop:16,fontSize:'var(--fs-body-sm)',fontWeight:700,color:'var(--text-body)'}}>1분이면 끝, 매일 새로운 혜택</div>
          </div>
          <Icon name="gift" size={64} color="var(--amber-400)"/>
        </div>
      </Sheet>
      <Toast open={!!toast} message={toast}/>
      {toast&&<HomeToastClear onDone={()=>setToast('')}/>}
    </div>
  );
}

function HomeToastClear({onDone}){
  React.useEffect(()=>{const t=setTimeout(onDone,1600);return ()=>clearTimeout(t);},[]);
  return null;
}

Object.assign(window,{HomeScreen});
