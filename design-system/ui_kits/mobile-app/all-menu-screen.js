const DS=()=>window.YeoulBankDesignSystem_073d1f||{};
const AppBar=props=>React.createElement(DS().AppBar,props,props&&props.children);
const IconButton=props=>React.createElement(DS().IconButton,props,props&&props.children);
const Icon=props=>React.createElement(DS().Icon,props,props&&props.children);
const TextField=props=>React.createElement(DS().TextField,props,props&&props.children);
const TabBar=props=>React.createElement(DS().TabBar,props,props&&props.children);
const SectionHeader=props=>React.createElement(DS().SectionHeader,props,props&&props.children);
const MenuGrid=props=>React.createElement(DS().MenuGrid,props,props&&props.children);
const ListRow=props=>React.createElement(DS().ListRow,props,props&&props.children);
const Card=props=>React.createElement(DS().Card,props,props&&props.children);
const Divider=props=>React.createElement(DS().Divider,props,props&&props.children);
const Button=props=>React.createElement(DS().Button,props,props&&props.children);
const Badge=props=>React.createElement(DS().Badge,props,props&&props.children);
const Toast=props=>React.createElement(DS().Toast,props,props&&props.children);

const MENU_TABS=[{id:'bank',label:'뱅킹'},{id:'product',label:'금융상품'},{id:'life',label:'생활·혜택'}];

const MENU_DATA={
  bank:[
    {title:'조회',items:[
      {id:'b1',label:'전체계좌조회',icon:'list',shape:'squircle',bg:'var(--obj-blue)'},
      {id:'b2',label:'거래내역조회',icon:'receipt-text',shape:'squircle',bg:'var(--obj-blue-deep)'},
      {id:'b3',label:'해지계좌조회',icon:'archive',shape:'squircle',bg:'var(--obj-violet)'},
      {id:'b4',label:'예금이자조회',icon:'percent',shape:'circle',bg:'var(--obj-amber)'}]},
    {title:'이체',items:[
      {id:'b5',label:'계좌이체',icon:'arrow-left-right',shape:'squircle',bg:'var(--obj-blue)'},
      {id:'b6',label:'자동이체',icon:'repeat',shape:'circle',bg:'var(--obj-teal)'},
      {id:'b7',label:'대량이체',icon:'layers',shape:'squircle',bg:'var(--obj-violet)'},
      {id:'b8',label:'이체한도변경',icon:'arrow-down-up',shape:'circle',bg:'var(--obj-amber)'}]},
    {title:'공과금·세금',items:[
      {id:'b9',label:'공과금납부',icon:'receipt',shape:'squircle',bg:'var(--obj-blue-deep)',accent:{name:'arrow-right',bg:'var(--ink-800)',size:11}},
      {id:'b10',label:'지방세',icon:'landmark',shape:'squircle',bg:'var(--obj-gold)'},
      {id:'b11',label:'대학등록금',icon:'graduation-cap',shape:'squircle',bg:'var(--obj-violet)'},
      {id:'b12',label:'납부내역',icon:'file-clock',shape:'squircle',bg:'var(--obj-blue)'}]}],
  product:[
    {title:'예금·적금',items:[
      {id:'p1',label:'입출금',icon:'arrow-left-right',shape:'squircle',bg:'var(--obj-blue)'},
      {id:'p2',label:'예금',icon:'landmark',shape:'circle',bg:'var(--obj-amber)'},
      {id:'p3',label:'적금',icon:'credit-card',shape:'squircle',bg:'var(--obj-green)',accent:{name:'percent',bg:'var(--obj-blue-deep)',size:11}},
      {id:'p4',label:'주택청약',icon:'house',shape:'squircle',bg:'var(--obj-violet)'}]},
    {title:'투자·대출',items:[
      {id:'p5',label:'펀드',icon:'chart-pie',shape:'circle',bg:'var(--obj-violet)'},
      {id:'p6',label:'대출',icon:'wallet',shape:'squircle',bg:'var(--obj-pink)'},
      {id:'p7',label:'외환',icon:'dollar-sign',shape:'circle',bg:'var(--obj-amber)',accent:{name:'refresh-cw',bg:'var(--obj-blue-deep)',size:11}},
      {id:'p8',label:'퇴직연금',icon:'hand-coins',shape:'circle',bg:'var(--obj-amber)'},
      {id:'p9',label:'신탁',icon:'chart-column',shape:'squircle',bg:'var(--obj-blue)',accent:{name:'arrow-up-right',bg:'var(--obj-red)',size:11}},
      {id:'p10',label:'ISA',icon:'shield',shape:'squircle',bg:'var(--obj-violet)'},
      {id:'p11',label:'보험',icon:'heart',shape:'squircle',bg:'var(--obj-red)'},
      {id:'p12',label:'골드/실버바',icon:'gem',shape:'squircle',bg:'var(--obj-gold)'}]}],
  life:[
    {title:'포인트',items:[
      {id:'l1',label:'포인트쌓기',icon:'circle-dollar-sign',shape:'circle',bg:'var(--obj-amber)'},
      {id:'l2',label:'나루룰렛',icon:'disc-3',shape:'circle',bg:'var(--obj-green)'},
      {id:'l3',label:'출석체크',icon:'calendar-check',shape:'squircle',bg:'var(--obj-blue)'},
      {id:'l4',label:'포인트 선물',icon:'gift',shape:'squircle',bg:'var(--obj-pink)'}]},
    {title:'생활혜택',items:[
      {id:'l5',label:'공동구매',icon:'shopping-basket',shape:'squircle',bg:'var(--obj-red)'},
      {id:'l6',label:'할인쿠폰',icon:'ticket',shape:'squircle',bg:'var(--obj-gold)',accent:{name:'percent',bg:'var(--obj-pink)',size:11}},
      {id:'l7',label:'페이스페이',icon:'scan-face',shape:'squircle',bg:'var(--obj-blue-deep)'},
      {id:'l8',label:'급여ON',icon:'mail-open',shape:'squircle',bg:'var(--obj-green)',accent:{name:'circle-dollar-sign',bg:'var(--obj-amber)',size:12}}]}]
};

const SETTINGS=[
  {id:'s1',title:'내 정보 관리',sub:'휴대폰번호 · 주소 · 이메일',icon:'user-round'},
  {id:'s2',title:'인증·보안',sub:'간편비밀번호 · 생체인증 · 인증서',icon:'shield-check'},
  {id:'s3',title:'알림 설정',sub:'입출금 알림 · 마케팅 수신',icon:'bell'},
  {id:'s4',title:'고객센터',sub:'1588-0000 · 평일 09:00-18:00',icon:'headset'}
];

function AllMenuScreen({onBack,big}){
  const [tab,setTab]=React.useState('bank');
  const [q,setQ]=React.useState('');
  const [toast,setToast]=React.useState('');
  const groups=MENU_DATA[tab];
  return (
    <div className={big?'naru-bigtext':undefined} style={{flex:1,minHeight:0,display:'flex',flexDirection:'column',background:'var(--surface-app)'}}>
      <div style={{background:'var(--surface-card)',flex:'none'}}>
        <AppBar title="전체메뉴"
          leading={<IconButton label="뒤로" onClick={onBack}><Icon name="chevron-left" size={24}/></IconButton>}
          actions={<><IconButton label="홈" onClick={onBack}><Icon name="house" size={21}/></IconButton>
                     <IconButton label="설정"><Icon name="settings" size={21}/></IconButton></>}/>
        <div style={{padding:'0 var(--gutter) 12px'}}>
          <TextField value={q} onChange={setQ} placeholder="메뉴 검색"
            prefix={<Icon name="search" size={19} color="var(--ink-400)"/>} style={{gap:0}}/>
        </div>
        <div style={{padding:'0 var(--gutter)'}}>
          <TabBar value={tab} onChange={setTab} tabs={MENU_TABS}/>
        </div>
      </div>

      <div style={{flex:1,minHeight:0,overflowY:'auto',padding:'20px var(--gutter) 28px',display:'flex',flexDirection:'column',gap:'var(--card-gap)'}}>
        {groups.map(g=>(
          <div key={g.title}>
            <SectionHeader title={g.title}/>
            <Card>
              <MenuGrid onSelect={id=>setToast(g.items.find(i=>i.id===id).label+' 화면으로 이동해요')}
                items={g.items.map(i=>({id:i.id,label:i.label,shape:i.shape,bg:i.bg,color:i.color,
                  icon:<Icon name={i.icon} size={22}/>,
                  accent:i.accent?{icon:<Icon name={i.accent.name} size={i.accent.size}/>,bg:i.accent.bg}:undefined}))}/>
            </Card>
          </div>
        ))}

        <SectionHeader title="설정" style={{paddingTop:16}}/>
        <Card padding="4px 20px">
          {SETTINGS.map((s,i)=>(
            <React.Fragment key={s.id}>
              {i>0&&<Divider inset={52}/>}
              <ListRow icon={<Icon name={s.icon} size={22} color="var(--ink-500)"/>} title={s.title} subtitle={s.sub}
                chevron onClick={()=>setToast(s.title+' 화면으로 이동해요')}/>
            </React.Fragment>
          ))}
        </Card>

        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10,paddingTop:20}}>
          <Button variant="outline" size="md" leadingIcon={<Icon name="log-out" size={18}/>} onClick={onBack}>로그아웃</Button>
          <span style={{fontSize:'var(--fs-micro)',color:'var(--text-subtle)'}}>나루뱅크 v6.2.1 · 준법감시인 심의필 2026-0000</span>
        </div>
      </div>
      <Toast open={!!toast} message={toast} style={{bottom:24}}/>
      {toast&&<MenuToastClear onDone={()=>setToast('')}/>}
    </div>
  );
}

function MenuToastClear({onDone}){
  React.useEffect(()=>{const t=setTimeout(onDone,1600);return ()=>clearTimeout(t);},[]);
  return null;
}

Object.assign(window,{AllMenuScreen});
