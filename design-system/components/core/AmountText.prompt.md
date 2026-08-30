Use `AmountText` for every money or point figure so grouping, tabular figures and the small unit suffix stay consistent.

```jsx
<AmountText value={1175776}/>
<AmountText value={119651} unit="P" size="hero"/>
<AmountText value={-320000} unit="원" size="sm" signed direction="down"/>
```

`direction="up"` is red and `"down"` is blue — the Korean market convention, the inverse of US charts.
