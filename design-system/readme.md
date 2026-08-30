# 나루뱅크 (Naru Bank) Design System

A Korean mobile-banking design system: tokens, React primitives, foundation specimens and an
interactive app UI kit.

---

## ⚠️ Provenance — read this first

The only source material supplied was **ten Android screenshots of a third-party bank's app**
(`uploads/KakaoTalk_20260830_131140555*.jpg`). No codebase, Figma file, brand guide, logo, or font
binary was provided.

Reproducing another company's logo, mascot, wordmark or brand colours from screenshots is not
something this system does. So, at the user's direction (2026-08-30), this system:

- **Borrows the UX patterns** visible in the captures — patterns common to Korean mobile banking
  generally: card-per-account home, five-slot bottom nav, 큰글 accessibility toggle, points/benefits
  merchandising, 4-up product-category icon grids, promo bottom sheets, shuffled secure keypads.
- **Invents its own identity** — the name 나루, the teal/amber palette, the type ramp, the shape and
  motion language. None of it is derived from the captured brand.
- **Ships no logo.** No mark was supplied and none was drawn. The brand renders as the word 나루 set
  in type wherever a mark would go (see `guidelines/brand-wordmark.html`).

**나루** (na-ru) is the Korean word for a river landing — the place where boats put in and things cross over. Money arrives, money leaves.

### Substitutions to replace when real assets arrive
| Slot | Currently | Replace with |
|---|---|---|
| Brand font | **Pretendard Variable** (SIL OFL) from jsDelivr | your licensed brand face, self-hosted |
| Icon set | **Lucide** web font (ISC) from unpkg | your icon font / SVG sprite, copied into `assets/` |
| Logo | none — wordmark set in type | your `assets/logo.svg` |
| Illustration | none — Lucide glyphs stand in at banner/empty-state media slots | your 3D/illustrated asset library |

---

## Index

| Path | What |
|---|---|
| `AGENTS.md` | **Entry point for AI agents** — load order, hard rules, boilerplate, self-check |
| `tokens.json` | Machine-readable list of every permitted value |
| `prompts/` | Copy-paste task prompts (new screen, design review) |
| `styles.css` | Global entry point. `@import`s only — link this one file. |
| `tokens/` | `colors` · `typography` · `spacing` · `radius` · `elevation` · `motion` · `fonts` · `icons` · `keyframes` · `base` |
| `components/core/` | Button, IconButton, Badge, Chip, Card, AmountText, Divider, Icon |
| `components/forms/` | TextField, Toggle, CheckRow, Keypad, PinDots |
| `components/navigation/` | AppBar, BottomNav, TabBar, SectionHeader, ListRow, MenuGrid |
| `components/feedback/` | Sheet, Banner, Toast, EmptyState |
| `templates/app-screen/` | Starting template: phone-frame screen shell (status bar → app bar → cards → bottom nav) |
| `ui_kits/mobile-app/` | Interactive 로그인 → 홈 → 전체메뉴 click-through. See its README. |
| `guidelines/` | 21 foundation specimen cards (Colors, Type, Spacing, Shape, Motion, Brand) |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent Skills front-matter for use in Claude Code |

Every component ships `<Name>.jsx` + `<Name>.d.ts` (props contract) + `<Name>.prompt.md` (when & how).
Read the `.prompt.md` before using a component.

### Intentional additions
- **`Icon`** — a thin wrapper over the Lucide web font. Added because no icon set was supplied and
  every other component needs a glyph slot; delete it the moment a real icon system lands.
- **`AmountText`** — not a "standard" primitive, but currency formatting, tabular figures and the
  red-up/blue-down convention are load-bearing in a banking product and must not be re-derived per screen.

---

## CONTENT FUNDAMENTALS

### Register: 해요체, always
Every user-facing string ends in the polite-casual **해요체** (`-어요 / -해요 / -세요`). Never the formal
**합니다체**, which reads like a legal notice, and never plain 반말 except inside a short slogan.

- ✅ 계좌번호를 복사했어요
- ✅ 다른 은행 계좌를 연결하면 한눈에 볼 수 있어요
- ❌ 계좌번호가 복사되었습니다
- ❌ 고객님께서는 당사의 서비스를 이용하실 수 있습니다

### Person
The user is addressed as **{이름}님** in the header and is otherwise implicit. Korean drops the subject —
do not translate an English "you" into 당신 or 고객님 in body copy. The bank refers to itself only when it
must, as 나루뱅크; never 저희 or 당사.

### The two-beat merchandising hook
Promo copy is a muted setup, then a bold payoff. The setup is usually a question; the payoff is a benefit
plus the effort it costs.

> 중요한 일을 기다리고 있다면? — **운세 확인하고 포인트도 받자☆**
> 오늘의 혜택 — **요즘 핫한 이벤트 보기만 해도 포인트를!** — 1분이면 끝, 매일 새로운 혜택

### Casing, numerals, punctuation
- Menu and screen titles are **bare nouns**: 금융상품, 전체메뉴, 포인트쌓기. No verbs, no trailing punctuation.
- Numbers always carry ko-KR comma grouping and a unit: `1,175,776원`, `119,651P`, `4.15%`.
- 만/억 shorthand is fine in marketing copy (`100만P`), never in a balance.
- Dates compress to `8/24-8/31`; relative dates prefer `D-12`.
- One exclamation mark maximum per screen. No exclamation in system messages.
- Latin product names stay Latin (ISA, ATM출금, MY) and are not transliterated.
- Hashtag chips are a real device for audience filters: `#사회초년생`, `#직장인`.

### Emoji and unicode
**No emoji in the interface.** Not in labels, not in buttons, not in system messages. The one licensed
exception is a single decorative unicode glyph closing a marketing slogan (`받자☆`) — at most once per
screen, never in a functional string. Interface glyphs are always icons.

### Vibe
Warm, brisk, slightly playful — a competent teller who likes their job. Financial precision in the numbers,
lightness in the sentences around them. Nothing is ever urgent, scarce, or shouted.

---

## VISUAL FOUNDATIONS

### Colour
Brand **나루 Teal** (`--teal-500 #0B8478`) is the single action colour — primary buttons, filled toggles,
active PIN dots, brand tints. It is deliberately *not* a selection colour: selected tabs, chips and nav
items go **ink-black**, which keeps teal meaning "this does something".

**감귤 Amber** (`--amber-400 #FF8A3D`) is the reward accent: points, gifts, streaks. It never appears on a
primary action.

Neutrals are a **cool, faintly green ink ramp** — `#0E1414` to `#FAFBFB` — not blue-grey. Body text is
`--ink-800`, not black; pure-black weight is reserved for amounts and titles so figures read as the
loudest thing on a card.

Five **support hues** (violet / sky / rose / lime / gold) tint the category icon tiles. Each product
family owns one hue permanently — 적금 is always lime, 대출 always rose — so the grid becomes a memory
aid rather than decoration.

**Direction colours follow the Korean market**: 상승·입금 is red (`--money-up`), 하락·출금 is blue
(`--money-down`). This is the inverse of US charting; getting it backwards is a real error, not a
preference.

Maximum two background colours per screen: `--surface-app` grey and white cards. Tinted cards are
promotional and appear at most twice per scroll.

### Type
**Pretendard Variable**, 400–800. 15px body baseline, `--lh-normal` 1.5 — Korean glyphs are dense and need
the leading. Tracking tightens as size grows (`-0.01em` body → `-0.03em` display); headlines at 800 weight
with tight tracking are the single strongest brand signal.

**`word-break: keep-all` is global** (set on `body` in `tokens/base.css`). Korean must break between
어절, never mid-word — without it, headlines split as `포인트도 받 / 자☆`. Never override it.

600 semibold is the interface default (buttons, row titles, labels). 400 regular is prose only. There is no
serif, no mono, no secondary family — hierarchy comes from weight and size, never from a second typeface.

Amounts use tabular figures always (`.naru-num`), with the unit suffix (원 / P / %) dropped to 72% size and
one weight step so the figure stays the focal point.

**큰글 mode** is a first-class requirement, not an afterthought: `.naru-bigtext` rescales the whole ramp
from one class. Never set a fixed height on anything containing text.

### Spacing & layout
20px screen gutter, 20px card padding, 12px between stacked cards, 28px between titled sections. Rows are
56px (48px dense); nothing tappable goes below 44px. The scale steps by 2px to 16px, then by 8.

Fixed elements: a 56px app bar at the top, a 64px bottom nav docked at the bottom with rounded top corners
floating over scrolled content. Content scrolls between them; the nav never scrolls away. Section headers
sit on the grey page background, outside the cards they describe.

Grids are 4-up on phone for shortcuts and categories, 2-up for content tiles. Horizontal rails (chips,
promo cards) bleed past the right gutter to signal more content.

### Surfaces, borders, shadow
Cards are **20px radius, no border, soft cool shadow** (`0 1px 2px / 0 4px 12px` at 4–5% ink). They float;
nothing is embossed, inset, or given a coloured left border. Inside sheets and dense lists, cards drop to
`tone="flat"` — a hairline instead of a shadow — so shadows don't stack.

Borders are `--ink-100` hairlines between rows and `--ink-200` around outline buttons and fields.
Row dividers inset 56px to clear the icon column.

The bottom nav uses an upward shadow plus `--protect-bottom`, a white protection gradient, rather than a
hard rule. Blur (`--blur-nav`) is available for translucent nav over imagery but is used sparingly —
opaque white is the default.

### Shape
Generously rounded throughout: sheets 24, cards 20, tiles/icon-tiles 16/14, buttons 14, fields 12, chips and
avatars full-pill. Nothing in the system is square-cornered.

### Motion
Short and decelerating. 140ms for press and colour change, 220ms for toggles and fades, 320ms for screen
transitions, 380ms for the bottom sheet sliding up on `--ease-decel`. `--ease-spring` (a mild overshoot) is
used only on the toggle knob and PIN-dot fill. `prefers-reduced-motion` zeroes every duration.

There are no scroll-triggered reveals, no parallax, no looping ambient animation.

### Interaction states
- **Press** is a 0.97 scale plus one darker step of fill — both, never colour alone. Cards scale to 0.985.
- **Hover** essentially does not exist; these are touch surfaces. Desktop hover on links darkens teal one step.
- **Focus** is a 1px teal border plus a 3px 14%-teal ring — on fields only.
- **Disabled** is a grey fill with `--ink-400` text; outline variants keep their shape and lose contrast.
- **Selected** is ink-black fill (chips, segmented tabs) or an ink-black 2px underline (tabs) — never teal.
- **Error** reddens the border and adds a message; PIN entry additionally shakes 320ms.

### Imagery
The captured surfaces lean on glossy 3D rendered objects — coins, gift boxes, cards, characters — warm-lit,
saturated, on transparent backgrounds, sitting on the right side of banners and cards. **No such library was
supplied**, so banner and empty-state `media` slots currently hold a neutral Lucide glyph. When real art
arrives, drop it into `assets/illustrations/` and pass it as `media`; keep the warm, high-key, no-grain
treatment and never crop the object to a hard edge — these are cut-outs, not photographs.

There is no photography, no full-bleed hero image, no repeating pattern or texture in the system.

### Transparency & blur
Used in exactly three places: the modal scrim (`--surface-scrim`, 48% ink), the toast (92% ink), and the
optional nav blur. Elsewhere, surfaces are opaque — financial figures must never sit on a translucent layer.

---

## ICONOGRAPHY

**Substitution in force — flagged.** No icon assets were supplied. The system uses the **Lucide** web font
(`tokens/icons.css` → `https://unpkg.com/lucide-static@latest/font/lucide.css`), chosen because its 24px
box, 2px stroke and round caps are the closest common-license match to the outline glyphs in the captures.

- **Style**: single-weight **outline** line icons, 2px stroke, round caps and joins, 24px nominal box.
  20px inside list rows, 22px in the app bar and bottom nav, 24px in menu tiles.
- **Delivery**: an icon *font* (glyphs inherit `color` and `font-size`), wrapped by `components/core/Icon.jsx`.
  Names are Lucide kebab-case: `<Icon name="chevron-right"/>`.
- **Colour**: icons inherit text colour by default. In `MenuGrid` tiles they take a support-hue 600 step on a
  matching 100 tint. Never multi-colour a line icon.
- **Active state** in the bottom nav is heavier optical weight + ink-black, not a filled variant — there is no
  filled/outline pair in this set.
- **No emoji as icons. No unicode dingbats as icons.** The one ☆ in marketing copy is typography, not an icon.
- **No hand-drawn SVG.** If a needed glyph is absent from Lucide, request it rather than drawing one.

When a real icon system arrives: copy the font/sprite into `assets/icons/`, repoint `tokens/icons.css`, and
`Icon` keeps working unchanged.

---

## Namespace note

The JS namespace `window.YeoulBankDesignSystem_073d1f` is generated by the compiler from an earlier
project title and is **stable — do not rename it**. It is an identifier, not brand copy. Everything a
human or an agent reads says 나루 / Naru.

## Using this system

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const {Button,Card,AmountText,Icon}=window.YeoulBankDesignSystem_073d1f;
</script>
```

Rules of thumb: one primary button per screen · amounts always through `AmountText` · modals are always
`Sheet` · selection is ink-black, action is teal · never invent a colour outside the ramps.
