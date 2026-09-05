// 일회용 검증 스크립트 (throwaway). 커밋하지 않는다.
// FR-13 BRAND_CONCEPT 생성이 실제로 쓸 만한 카드 시안 3안을 내는지 확인한다.
//   실행: cd mockup && node spike-brand-concept.mjs
//   결과: mockup/spike-out/index.html 에 3안을 나란히 렌더링

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

// .env.local 에서 키만 읽는다 (값은 출력하지 않는다)
function loadKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("ANTHROPIC_API_KEY 가 없습니다. mockup/.env.local 에 넣어주세요.");
    process.exit(1);
  }
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  console.error("mockup/.env.local 에 ANTHROPIC_API_KEY 행이 없습니다.");
  process.exit(1);
}

// ── FR-13 브리프 (S08 입력값) ──────────────────────────────────────────
const BRIEF = {
  preset: { id: "CARD_H", name: "카드 실물 · 가로형", ratio: "1.586 : 1" },
  name: "NH 청년 우대 체크카드",
  target: "사회초년생 20대 후반",
  keywords: ["신뢰감", "젊은"],
  mustInclude: "",
  // FR-04 BRAND_ASSET — 실물 자산 반입 전이라 슬롯 정의만 넘긴다
  assets: [
    { slot: "logo", label: "NH 로고 (마스터)", kind: "로고", note: "실물 SVG 미반입 — 자리만 확보할 것" },
    { slot: "colors", label: "브랜드 색상 세트", kind: "색상", note: "미반입 — 지정 색 없음. 키워드에 맞게 제안할 것" },
    { slot: "cardRules", label: "카드 필수 표기 요소", kind: "배치 규칙", note: "로고 · IC칩 · 카드번호 · 상품명 · 카드브랜드 자리가 모두 있어야 함" },
  ],
};

const SYSTEM = `당신은 NH농협은행 내부 도구의 "브랜드 시안 생성기"다. 실물 카드·홍보물의 **컨셉 시안**을 만든다.

## 산출물
서로 다른 방향의 시안을 **정확히 3개** 만든다. 세부가 아니라 **방향이 달라야 한다** — 색만 바꾼 3개는 실패다.

## 절대 규칙
1. 출력은 **HTML + 인라인 CSS + 인라인 SVG**뿐이다. JavaScript, 외부 폰트, 외부 이미지, 네트워크 요청을 일절 쓰지 않는다.
2. **로고·캐릭터·일러스트·사진을 그리지 않는다.** 아래 "사용 가능한 자산"에 실물이 없으면, 그 자리를 **점선 테두리 플레이스홀더 박스 + 자산 이름**으로 표시한다. 있는 척 그려내면 실패다.
3. 카드 실물에는 필수 요소 자리가 모두 있어야 한다: 로고, IC칩, 카드번호 자리, 상품명, 카드 브랜드 자리.
4. 각 시안의 최상위 요소는 지정된 비율의 고정 캔버스다. \`width\`를 100%로 두고 \`aspect-ratio\`로 비율을 잡는다.
5. 텍스트는 한국어. 폰트는 시스템 폰트 스택만 쓴다.

## 출력 형식
아래를 **정확히 3번** 반복한다. 다른 설명을 앞뒤에 붙이지 않는다.

### VARIANT: <방향 이름> | <이 방향이 무엇을 노리는지 한두 문장. 디자인 전문용어 없이>
\`\`\`html
<div style="...">...</div>
\`\`\`

방향 이름은 비디자이너가 회의에서 그대로 말할 수 있는 한국어여야 한다.`;

const userText = `## 만들 것
- 산출물: ${BRIEF.preset.name}
- 캔버스 비율: ${BRIEF.preset.ratio}

## 브리프
- 상품 · 캠페인명: ${BRIEF.name}
- 타겟: ${BRIEF.target}
- 전달할 느낌: ${BRIEF.keywords.join(", ")}
- 꼭 들어갈 문구: ${BRIEF.mustInclude || "(없음)"}

## 사용 가능한 자산
${BRIEF.assets.map((a) => `- [${a.slot}] ${a.label} (${a.kind}) — ${a.note}`).join("\n")}

세 방향을 만들어라.`;

function parseVariants(text) {
  const out = [];
  const re = /###\s*VARIANT:\s*(.+?)\s*\|\s*([\s\S]*?)\n+```html\n([\s\S]*?)\n```/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    out.push({ label: m[1].trim(), rationale: m[2].trim(), html: m[3].trim() });
  }
  return out;
}

const client = new Anthropic({ apiKey: loadKey() });

console.log("생성 요청 중... (claude-opus-5, adaptive thinking)");
const stream = client.messages.stream({
  model: "claude-opus-5",
  max_tokens: 32000,
  thinking: { type: "adaptive" },
  system: SYSTEM,
  messages: [{ role: "user", content: userText }],
});
const response = await stream.finalMessage();

if (response.stop_reason === "refusal") {
  console.error("거부됨:", response.stop_details);
  process.exit(1);
}

const text = response.content
  .filter((b) => b.type === "text")
  .map((b) => b.text)
  .join("\n");

const variants = parseVariants(text);
console.log(`\n파싱된 시안: ${variants.length}개`);
console.log(`토큰: 입력 ${response.usage.input_tokens} / 출력 ${response.usage.output_tokens}`);

const outDir = path.join(process.cwd(), "spike-out");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "raw.txt"), text, "utf8");

if (variants.length === 0) {
  console.error("형식 파싱 실패. spike-out/raw.txt 를 확인하세요.");
  process.exit(1);
}

// S09 비교 화면과 같은 배치로 나란히 렌더링 — 샌드박스 iframe 격리
const page = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>FR-13 생성 검증</title>
<style>
  body { margin:0; background:#f1f5f9; padding:24px;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo','Malgun Gothic',sans-serif; }
  .grid { display:grid; grid-template-columns:repeat(${variants.length},minmax(0,1fr)); gap:20px; }
  .card { background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden; }
  .hd { padding:16px 18px 14px; border-bottom:1px solid #f1f5f9; }
  .hd h2 { font-size:15px; font-weight:700; color:#0f172a; margin:0 0 7px; }
  .hd p { font-size:12px; color:#64748b; line-height:1.6; margin:0; }
  .stage { padding:18px; background:#e9edf3; }
  iframe { width:100%; aspect-ratio:1.586/1; border:0; border-radius:12px;
    box-shadow:0 10px 24px rgba(15,23,42,.18); background:#fff; }
</style></head>
<body>
<h1 style="font-size:18px;color:#0f172a;margin:0 0 16px;">FR-13 BRAND_CONCEPT 생성 결과 — ${BRIEF.name}</h1>
<div class="grid">
${variants
  .map(
    (v) => `  <div class="card">
    <div class="hd"><h2>${v.label.replace(/[<>&]/g, "")}</h2><p>${v.rationale.replace(/[<>&]/g, "")}</p></div>
    <div class="stage"><iframe sandbox srcdoc="${v.html.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"></iframe></div>
  </div>`
  )
  .join("\n")}
</div>
</body></html>`;

fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");
console.log(`\n완료 → mockup/spike-out/index.html`);
variants.forEach((v, i) => console.log(`  ${i + 1}. ${v.label} — ${v.rationale}`));
