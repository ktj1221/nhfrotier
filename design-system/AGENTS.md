# AGENTS.md — 나루뱅크 (Naru Bank) Design System

**Read this file first. It is the entry point.** You are designing for 나루뱅크, a Korean mobile banking
product. Output is HTML mockups and prototypes.

---

## 1. Load order — read these, in order, before you write anything

| Step | File | Why |
|---|---|---|
| 1 | `tokens.json` | The complete list of permitted values. Nothing outside it is allowed. |
| 2 | `readme.md` → **CONTENT FUNDAMENTALS** | How copy is written. Korean register, casing, numbers. |
| 3 | `readme.md` → **VISUAL FOUNDATIONS** | Colour roles, type, spacing, shape, motion, states. |
| 4 | `components/*/​*.prompt.md` | 23 components: what each is for and when to use it. |
| 5 | `ui_kits/mobile-app/` | Three finished screens. **Copy their structure.** |

`components/<Name>.d.ts` holds each component's exact prop contract. Read it before passing props.

---

## 2. Non-negotiable rules

1. **Never write a raw colour.** No `#hex`, no `rgb()`. Only `var(--token)` from `tokens.json`.
   If you cannot find a token for what you need, you are solving the wrong problem — pick the nearest
   semantic alias (`--text-muted`, `--surface-card`) instead of inventing a value.
2. **Never write a raw radius, shadow, duration, or font-size.** Same rule: token or nothing.
   Spacing may use raw px only for values that already exist on the `--sp-*` scale.
3. **Teal is action, ink-black is selection.** Primary buttons, filled toggles, active PIN dots are
   `--action-primary`. Selected tabs, chips, nav items are ink-black. Never swap these.
4. **상승 is red, 하락 is blue** (`--money-up` / `--money-down`). This is the Korean convention and the
   inverse of US charts. Getting it backwards is a bug.
5. **All copy is 해요체.** Never 합니다체. Never address the user as 당신 or 고객님 in body copy.
6. **No emoji in the interface.** Ever. Glyphs are `<Icon>`.
7. **One primary button per screen.** Everything else is `secondary` / `outline` / `ghost`.
8. **Modals are `Sheet`.** There are no centre dialogs in this system.
9. **Money always goes through `AmountText`.** Never hand-format a number.
10. **Do not invent components.** Compose the 23 that exist. If something is genuinely missing, say so
    rather than authoring a lookalike.

---

## 3. Boilerplate for a new mockup

```html
<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8">
<link rel="stylesheet" href="styles.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="_ds_bundle.js"></script>
</head><body><div id="root"></div>
<script type="text/babel">
const {AppBar,BottomNav,Card,Button,AmountText,Icon,ListRow,SectionHeader,Sheet,Toast} = window.YeoulBankDesignSystem_073d1f;
// …your screen…
</script></body></html>
```

Phone canvas is **360 × 780**. Screen chrome: 56px `AppBar` at top, 64px `BottomNav` docked at bottom,
20px side gutter, content scrolling between them.

---

## 4. Self-check before you hand back a mockup

- [ ] `grep -E '#[0-9a-fA-F]{3,8}'` on your file returns nothing outside `styles.css`
- [ ] Every Korean string ends in 해요체
- [ ] Exactly one `variant="primary"` button per screen
- [ ] All amounts render through `AmountText`
- [ ] No emoji
- [ ] Tapped targets are ≥ 44px
- [ ] The layout still works with `.naru-bigtext` on the root (큰글 mode)

---

## 5. Where things live

```
tokens.json          ← permitted values (machine-readable)
styles.css           ← the one stylesheet to link
tokens/              ← the CSS behind tokens.json
components/          ← 23 components: .jsx + .d.ts + .prompt.md
  core/ forms/ navigation/ feedback/
ui_kits/mobile-app/  ← three finished screens — your reference for structure
guidelines/          ← 21 visual specimen cards
templates/           ← a phone-screen starting shell
prompts/             ← copy-paste task prompts
readme.md            ← the full design guide
SKILL.md             ← Agent Skill front-matter
```

## 6. Known gaps — do not paper over these

- **No logo.** The brand renders as the word 나루 set in type. Do not draw a mark.
- **No illustration library.** Banner and empty-state `media` slots take a neutral `<Icon>`. Do not
  generate images or hand-draw SVG art.
- **Icons are Lucide** (a flagged substitute for an unsupplied brand set), outline only, one weight.
- **The font is Pretendard** (a flagged substitute), loaded from CDN.

If a task needs one of these, say it is missing rather than improvising.
