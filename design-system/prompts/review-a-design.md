# Prompt template — review a design against the system

Read `AGENTS.md` and `tokens.json`. Then review the attached design/file and report:

1. **Token violations** — every raw hex, px radius, shadow, duration, or font-size that should be a token.
   Give the offending value and the token that should replace it.
2. **Component violations** — anything hand-built that an existing component covers, and anything using a
   component outside its `.prompt.md` guidance.
3. **Copy violations** — 합니다체, 당신/고객님, emoji, exclamation overuse, titles with verbs or punctuation,
   unformatted numbers.
4. **Colour-role violations** — teal used for selection, ink-black used for a primary action,
   상승/하락 colours reversed.
5. **Accessibility** — tap targets under 44px, layout that breaks under `.naru-bigtext`.

Report as a table: 위치 / 문제 / 고쳐야 할 값. Do not fix anything unless asked.
