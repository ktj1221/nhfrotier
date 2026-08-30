Use `AppBar` at the top of every non-home screen. Titles are plain nouns (금융상품, 포인트쌓기) — no verbs, no punctuation.

```jsx
<AppBar title="전체메뉴"
  leading={<IconButton label="뒤로"><Icon name="chevron-left"/></IconButton>}
  actions={<><IconButton label="홈"><Icon name="home"/></IconButton><IconButton label="검색"><Icon name="search"/></IconButton></>}/>
```
