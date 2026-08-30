Use `IconButton` for glyph-only actions — app-bar utilities, the card kebab, notification bell.

```jsx
<IconButton label="알림" badge onClick={openAlerts}><Icon name="bell"/></IconButton>
<IconButton label="메뉴" tone="soft" shape="squircle"><Icon name="menu"/></IconButton>
```

Always pass `label`. `badge` renders the 6px red unread dot used on the bell.
