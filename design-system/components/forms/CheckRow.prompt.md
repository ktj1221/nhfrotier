Use `CheckRow` for consent lists. The master row gets `emphasis`, children rows sit under a hairline.

```jsx
<CheckRow emphasis checked={all} onChange={toggleAll}>약관 전체 동의</CheckRow>
<Divider/>
<CheckRow checked={a} onChange={setA} trailing={<Icon name="chevron-right"/>}>[필수] 서비스 이용약관</CheckRow>
```
