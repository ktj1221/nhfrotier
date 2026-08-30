Use `ListRow` for any scannable list. Pair with `Divider inset={56}` when rows carry icons.

```jsx
<ListRow icon={<Icon name="wallet"/>} title="퀴즈로 상식 쌓고" subtitle="최대 10P 받기"
  trailing={<Badge tone="success">최대 10</Badge>}/>
<ListRow title="이체한도 변경" dense chevron onClick={go}/>
```
