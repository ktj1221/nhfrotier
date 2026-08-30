# Prompt template — new screen mockup

Copy this, fill the brackets, paste into your agent.

---

Read `AGENTS.md` in this design system first, then `tokens.json`, then the CONTENT FUNDAMENTALS and
VISUAL FOUNDATIONS sections of `readme.md`. Look at `ui_kits/mobile-app/home-screen.js` to see how a
screen is assembled from the components.

Then build: **[화면 이름]**

- 목적: [사용자가 이 화면에서 하려는 것 한 문장]
- 진입 경로: [어디서 들어오는가]
- 화면에 반드시 있어야 할 것: [항목들]
- 주요 액션(하단 CTA): [버튼 라벨]

Constraints:
- 360×780 phone canvas, inside the `PhoneFrame` pattern from the UI kit
- Only `var(--*)` values from `tokens.json` — no raw hex, radius, shadow, or duration
- Compose only the 23 existing components; do not author new ones
- All copy in 해요체, no emoji
- One `variant="primary"` button
- Run the self-check list at the end of `AGENTS.md` before handing back

Output a single self-contained HTML file that opens in a browser.
