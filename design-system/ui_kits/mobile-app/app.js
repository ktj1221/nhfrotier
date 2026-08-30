const DS=()=>window.YeoulBankDesignSystem_073d1f||{};
const BottomNav=props=>React.createElement(DS().BottomNav,props,props&&props.children);
const Icon=props=>React.createElement(DS().Icon,props,props&&props.children);

const TABS=()=>[
  {id:'home',label:'홈',icon:<Icon name="house" size={22}/>},
  {id:'products',label:'금융상품',icon:<Icon name="briefcase" size={22}/>},
  {id:'assets',label:'내 자산',icon:<Icon name="wallet" size={22}/>},
  {id:'points',label:'포인트쌓기',icon:<Icon name="circle-dollar-sign" size={22}/>},
  {id:'benefits',label:'생활혜택',icon:<Icon name="gift" size={22}/>}
];

function App(){
  const [screen,setScreen]=React.useState('login');
  const [tab,setTab]=React.useState('home');
  const [big,setBig]=React.useState(false);
  return (
    <PhoneFrame bg={screen==='login'?'var(--surface-card)':'var(--surface-app)'}>
      {screen==='login'&&<LoginScreen onSuccess={()=>setScreen('home')}/>}
      {screen==='home'&&<>
        <HomeScreen big={big} setBig={setBig} onOpenMenu={()=>setScreen('menu')}/>
        <BottomNav items={TABS()} value={tab} onChange={setTab}/>
      </>}
      {screen==='menu'&&<AllMenuScreen big={big} onBack={()=>setScreen('home')}/>}
    </PhoneFrame>
  );
}

if(window.__NARU_KIT){ReactDOM.createRoot(document.getElementById('root')).render(<App/>);}
