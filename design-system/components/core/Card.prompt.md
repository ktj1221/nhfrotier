Use `Card` for every grouped block on an app screen. Cards sit on `--surface-app` grey with a 20px gutter and 12px vertical gap.

```jsx
<Card><AmountText value={1175776}/></Card>
<Card tone="brand" interactive onClick={go}>운세 확인하고 포인트도 받자</Card>
```

Tones: `card` (default, shadowed white) · `flat` (hairline, no shadow — inside sheets) · `sunken` · `brand`/`accent` (soft tinted promo) · `inverse`. Never add a coloured left border.
