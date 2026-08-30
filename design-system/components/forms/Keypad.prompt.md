Use `Keypad` docked to the bottom of PIN/amount screens — full-bleed, no side gutter, 1px grey grid lines showing through.

```jsx
<Keypad shuffle variant="secure" onKey={handleKey}/>
```

Financial PIN entry must use `shuffle`; plain amount entry does not.
