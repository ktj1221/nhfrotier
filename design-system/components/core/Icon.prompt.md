Use `Icon` wherever a glyph is needed; it renders a Lucide web-font character that inherits colour and can be sized freely.

```jsx
<Icon name="house"/>
<Icon name="chevron-right" size={20} color="var(--ink-300)"/>
```

Names are Lucide kebab-case. Never hand-draw an SVG when a Lucide glyph exists; never use emoji as an
interface icon. There is only one icon family and one weight — richness in category tiles comes from
`MenuGrid`'s tinted tile and accent badge, not from a second icon set.
