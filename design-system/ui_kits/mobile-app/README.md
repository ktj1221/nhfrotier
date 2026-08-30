# 나루뱅크 — Mobile UI Kit

Interactive recreation of the app's authentication and navigation surfaces, built entirely from the
design system's own components (`window.YeoulBankDesignSystem_073d1f`).

## Screens
| File | Screen | Notes |
|---|---|---|
| `login-screen.js` | 로그인/인증 | 6-digit 간편비밀번호 with a shuffled secure keypad, 생체인증 affordance, 인증서 tab |
| `home-screen.js` | 홈 | Account card, promo banners, shortcut grid, 모임 card, promo bottom sheet, 큰글 toggle |
| `all-menu-screen.js` | 전체메뉴 | Search, three-tab IA (뱅킹 / 금융상품 / 생활·혜택), category grids, settings list, 로그아웃 |
| `phone-frame.js` | — | 360×780 device shell + status bar |
| `app.js` | — | Screen router and bottom-nav state |

## Flow
`로그인` → enter any 6 digits (or 인증서로 로그인) → `홈` → tap the ☰ icon → `전체메뉴` → 뒤로/로그아웃 returns home.

## Scope
The brief asked for 로그인/인증 and 전체메뉴. `홈` is included because 전체메뉴 has no meaning without
the surface it opens from, and it exercises the card / banner / grid vocabulary. The other three bottom-nav
tabs are intentionally not built — tapping them changes the active tab only.

## Why `.js`, not `.jsx`
The design-system compiler bundles **every** `.jsx` in the project into `_ds_bundle.js`. These are screens,
not components: each opens with `const {Icon}=window.<Namespace>`, which is `undefined` at bundle-evaluation
time, and `app.js` mounts a React root. A `.js` extension keeps them out of the bundle;
`<script type="text/babel">` transpiles the JSX regardless of extension.
