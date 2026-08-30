Use `TextField` for typed entry (아이디, 계좌번호, 금액). Amounts and account numbers get `inputMode="numeric"`.

```jsx
<TextField label="아이디" value={id} onChange={setId} placeholder="아이디를 입력하세요"/>
<TextField label="이체금액" inputMode="numeric" suffix={<span>원</span>} error="잔액이 부족해요"/>
```
