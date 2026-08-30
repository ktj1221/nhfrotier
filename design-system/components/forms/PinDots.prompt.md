Use `PinDots` above the `Keypad` on the PIN screen. Set `error` to shake and redden on a wrong code, then reset `filled` to 0.

```jsx
<PinDots length={6} filled={pin.length} error={failed}/>
```
