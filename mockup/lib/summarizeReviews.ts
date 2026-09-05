import Anthropic from '@anthropic-ai/sdk';
import type { ReviewCategory } from './db';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface SummarizedItem {
  category: ReviewCategory;
  title: string;
  detail: string;
}

interface SourceComment {
  authorName: string;
  content: string;
}

interface SourceNote {
  name: string;
  content: string;
}

export async function summarizeReviews(
  comments: SourceComment[],
  notes: SourceNote[]
): Promise<SummarizedItem[]> {
  if (comments.length === 0 && notes.length === 0) {
    throw new Error('정리할 의견이나 회의자료가 없습니다.');
  }

  const systemPrompt = `You are an assistant that organizes stakeholder feedback for a business project into three categories: 합의(consensus), 이견(disagreement), 추가확인(needs follow-up).

Rules:
- Read the provided comments and meeting notes (written in Korean).
- Group related points into items. Each item must have: category (정확히 "합의", "이견", "추가확인" 중 하나), title (한 줄 요약), detail (구체적 내용, 관련자 언급 포함).
- Do not invent opinions that are not present in the source text.
- Output ONLY a JSON array, no markdown fences, no explanation. Example:
[{"category":"합의","title":"...","detail":"..."},{"category":"이견","title":"...","detail":"..."}]`;

  const sections: string[] = [];
  if (notes.length > 0) {
    sections.push(
      notes.map((n) => `[회의자료: ${n.name}]\n${n.content}`).join('\n\n')
    );
  }
  if (comments.length > 0) {
    sections.push(
      '[등록된 의견]\n' + comments.map((c) => `- ${c.authorName}: ${c.content}`).join('\n')
    );
  }

  const response = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: sections.join('\n\n---\n\n') }],
  });

  const textContent = response.content.find((c) => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('AI가 응답을 생성하지 못했습니다.');
  }

  let jsonText = textContent.text.trim();
  const fenceMatch = jsonText.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
  if (fenceMatch) jsonText = fenceMatch[1];

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error('AI 응답을 해석할 수 없습니다.');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('AI 응답 형식이 올바르지 않습니다.');
  }

  const VALID_CATEGORIES: ReviewCategory[] = ['합의', '이견', '추가확인'];
  const items: SummarizedItem[] = [];
  for (const raw of parsed) {
    if (
      raw && typeof raw === 'object' &&
      'category' in raw && 'title' in raw && 'detail' in raw &&
      VALID_CATEGORIES.includes((raw as { category: string }).category as ReviewCategory)
    ) {
      const item = raw as { category: string; title: string; detail: string };
      items.push({ category: item.category as ReviewCategory, title: String(item.title), detail: String(item.detail) });
    }
  }

  if (items.length === 0) {
    throw new Error('AI가 분류 가능한 의견을 찾지 못했습니다.');
  }

  return items;
}
