Use `Button` for any tappable action; the full-width `size="xl" variant="primary"` form is the standard bottom CTA docked above the safe area.

```jsx
<Button variant="primary" size="xl" block onClick={submit}>다음</Button>
<Button variant="outline" size="md" leadingIcon={<Icon name="copy"/>}>계좌 복사</Button>
```

Variants: `primary` (teal, one per screen) · `secondary` (grey fill, paired actions) · `outline` (on cards — the 이체/거래내역 row) · `ghost` (inline text action) · `inverse` (near-black, promo/banner) · `danger`. Press state is a 0.97 scale plus a one-step-darker fill; there is no hover styling on the mobile surfaces.
