Use `Sheet` for anything modal on mobile — there are no centre dialogs in this system.

```jsx
<Sheet open={open} onClose={close} secondaryLabel="1일동안 안보기" onSecondary={snooze}>
  <Badge tone="info">오늘의 혜택</Badge>
  <h3>요즘 핫한 이벤트 보기만 해도 포인트를!</h3>
</Sheet>
```

The parent must be `position:relative` (a phone frame). Enters with a 380ms decelerating slide.
