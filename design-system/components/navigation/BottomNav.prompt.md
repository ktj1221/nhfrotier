Use `BottomNav` as the persistent root navigation. Active state is ink-black label + heavier icon stroke — never a teal tint or a pill background.

```jsx
<BottomNav value={tab} onChange={setTab} items={[
  {id:'home',label:'홈',icon:<Icon name="house"/>},
  {id:'products',label:'금융상품',icon:<Icon name="briefcase"/>},
  {id:'assets',label:'내 자산',icon:<Icon name="wallet"/>},
  {id:'points',label:'포인트쌓기',icon:<Icon name="circle-dollar-sign"/>},
  {id:'benefits',label:'생활혜택',icon:<Icon name="gift"/>}]}/>
```
