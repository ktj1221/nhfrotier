import Anthropic from '@anthropic-ai/sdk';
import {
  RULE_IDS,
  buildReviewInstruction,
  findRule,
  type RuleCategory,
} from './responsibility-rules';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const REVIEW_MODEL = 'claude-opus-5';

export type Severity = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ResponsibilityFinding {
  rule_id: string;
  category: RuleCategory;
  severity: Severity;
  title: string;
  /** 목업에서 그대로 인용한 근거. 비어 있으면 버린다. */
  evidence: string;
  why: string;
  suggestion: string;
  needs_compliance_review: boolean;
}

const REPORT_TOOL: Anthropic.Tool = {
  name: 'report_findings',
  description:
    '책임성 검토 결과를 보고한다. 지적할 항목이 없으면 findings를 빈 배열로 보고한다.',
  strict: true,
  input_schema: {
    type: 'object',
    additionalProperties: false,
    required: ['findings'],
    properties: {
      findings: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['rule_id', 'category', 'severity', 'title', 'evidence', 'why', 'suggestion'],
          properties: {
            rule_id: { type: 'string', description: '규칙 ID. 예: RR-B01' },
            category: {
              type: 'string',
              enum: ['EXPRESSION', 'CONSUMER', 'DARKPATTERN', 'ACCESSIBILITY'],
            },
            severity: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
            title: { type: 'string', description: '지적 내용 한 줄 (한국어)' },
            evidence: {
              type: 'string',
              description: '목업 HTML에서 그대로 인용한 문구 또는 요소. 지어내지 말 것.',
            },
            why: { type: 'string', description: '왜 문제인지 (한국어, 2문장 이내)' },
            suggestion: { type: 'string', description: '어떻게 고치면 되는지 (한국어, 1~2문장)' },
          },
        },
      },
    },
  },
};

const SYSTEM_PROMPT = `당신은 농협은행 내부 화면 설계 산출물의 **책임성 검토자**다.
전달받은 HTML 목업을 읽고, 아래 규칙에 해당하는 지점을 찾아 report_findings 도구로 보고한다.

## 반드시 지킬 경계

1. **판정하지 않는다.** "위법", "적법", "법 위반", "규정 위반" 같은 판정 표현을 쓰지 말 것.
   금융 표현의 적법성 판단은 사람(준법 담당자)의 몫이다. 당신은 "검토가 필요해 보인다"까지만 말한다.
2. **근거 없이 지적하지 않는다.** evidence에는 목업 HTML에 실제로 있는 문구나 요소를 그대로 옮겨 적는다.
   그대로 옮길 것이 없으면 그 항목을 아예 보고하지 않는다. 추측으로 채우지 말 것.
3. **없는 것을 만들어내지 않는다.** 규칙에 해당하는 것이 없으면 findings를 빈 배열로 보고한다.
   억지로 채우면 담당자가 전체를 신뢰하지 않게 되어 검토 자체가 무의미해진다.
4. **rule_id는 아래 목록에 있는 것만 쓴다.** 새 ID를 만들지 말 것.

## 심각도 기준

- HIGH: 그대로 실제 화면이 되면 고객이 오인하거나 배제될 가능성이 큰 것
- MEDIUM: 고쳐야 하지만 대안이 명확한 것
- LOW: 개선하면 좋은 것

## 검토 규칙

${buildReviewInstruction()}

## 출력

반드시 report_findings 도구를 호출해서 답한다. 도구 없이 텍스트로만 답하지 말 것.
title, why, suggestion은 한국어로 쓴다.`;

interface RawFinding {
  rule_id?: unknown;
  category?: unknown;
  severity?: unknown;
  title?: unknown;
  evidence?: unknown;
  why?: unknown;
  suggestion?: unknown;
}

const SEVERITIES: Severity[] = ['HIGH', 'MEDIUM', 'LOW'];

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * 모델 출력을 규칙 목록에 비추어 검증한다.
 * 규칙에 없는 ID이거나 근거가 비어 있으면 버린다 — 담당자가 판단할 수 없는 지적은 노이즈다.
 */
function normalize(raw: RawFinding[]): ResponsibilityFinding[] {
  const seen = new Set<string>();
  const out: ResponsibilityFinding[] = [];

  for (const item of raw) {
    if (!isNonEmptyString(item.rule_id) || !RULE_IDS.has(item.rule_id)) continue;
    if (!isNonEmptyString(item.evidence)) continue;
    if (!isNonEmptyString(item.title) || !isNonEmptyString(item.why) || !isNonEmptyString(item.suggestion)) continue;

    const rule = findRule(item.rule_id);
    if (!rule) continue;

    const key = `${item.rule_id}::${item.evidence.trim()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const severity = SEVERITIES.includes(item.severity as Severity)
      ? (item.severity as Severity)
      : 'MEDIUM';

    out.push({
      rule_id: rule.id,
      // 카테고리는 모델 출력이 아니라 규칙 정의를 신뢰한다
      category: rule.category,
      severity,
      title: item.title.trim(),
      evidence: item.evidence.trim(),
      why: item.why.trim(),
      suggestion: item.suggestion.trim(),
      needs_compliance_review: rule.needsComplianceReview,
    });
  }

  return out;
}

export async function reviewResponsibility(
  html: string,
  proposalContent: string
): Promise<ResponsibilityFinding[]> {
  const stream = client.messages.stream({
    model: REVIEW_MODEL,
    max_tokens: 32000,
    thinking: { type: 'adaptive' },
    system: SYSTEM_PROMPT,
    tools: [REPORT_TOOL],
    messages: [
      {
        role: 'user',
        content: `아래는 기획안과 그 기획안으로 생성된 HTML 목업이다. 목업을 검토하고 report_findings를 호출하라.

## 기획안

${proposalContent}

## 생성된 HTML 목업

${html}`,
      },
    ],
  });

  const response = await stream.finalMessage();

  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock =>
      block.type === 'tool_use' && block.name === 'report_findings'
  );

  if (!toolUse) {
    throw new Error('AI가 검토 결과를 보고하지 못했습니다.');
  }

  const input = toolUse.input as { findings?: unknown };
  if (!Array.isArray(input.findings)) return [];

  return normalize(input.findings as RawFinding[]);
}
