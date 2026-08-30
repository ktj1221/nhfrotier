Use `MenuGrid` for shortcut clusters and product-category grids — inside a white `Card`, 4 columns, 28px row gap.

Each item is a **saturated coloured object with a white glyph on it** — not a glyph on a pale tinted tile.
The object sits directly on the white card, no container behind it.

```jsx
<Card><MenuGrid onSelect={go} items={[
  {id:'io',label:'입출금',shape:'squircle',bg:'var(--obj-blue)',icon:<Icon name="arrow-left-right" size={22}/>},
  {id:'dep',label:'예금',shape:'circle',bg:'var(--obj-amber)',icon:<Won/>},
  {id:'sav',label:'적금',shape:'squircle',bg:'var(--obj-green)',icon:<Icon name="credit-card" size={22}/>,
   accent:{icon:<Icon name="percent" size={11}/>,bg:'var(--obj-blue-deep)'}},
  {id:'fx',label:'외환',shape:'circle',bg:'var(--obj-amber)',icon:<Icon name="dollar-sign" size={22}/>,
   accent:{icon:<Icon name="refresh-cw" size={11}/>,bg:'var(--obj-blue-deep)'}}]}/></Card>
```

Rules:
- **Shape carries meaning**: `circle` for money and currency, `squircle` for cards, documents and containers.
- Pull fills from the `--obj-*` object palette only, and keep each product family's colour stable across screens.
- The `accent` badge is a *second* hue that qualifies the item (% 금리, ↻ 환전, + 가입) — never decoration,
  and never on more than half the grid.
- Glyphs are white; the colour lives in the object.
- Labels wrap to two lines rather than clipping — the item overrides the global `word-break: keep-all`,
  since a 6-character Korean label (`전체계좌조회`) is one unbreakable 어절 that would otherwise floor the
  `1fr` track above the container width. Keep labels under 7 characters where you can.
