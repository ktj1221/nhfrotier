Use `TabBar` to switch content within one screen — 전체메뉴's 뱅킹/카드/혜택 split, or 내 계좌 / 다른 금융.

```jsx
<TabBar value={tab} onChange={setTab} tabs={[{id:'nh',label:'내 계좌'},{id:'open',label:'다른 금융'}]}/>
```

The indicator is ink-black, 2px — brand teal is reserved for actions, not selection.
