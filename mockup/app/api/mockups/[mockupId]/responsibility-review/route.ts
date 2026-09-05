import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { reviewResponsibility, REVIEW_MODEL } from '@/lib/review-responsibility';

const FINDINGS_QUERY = `
  SELECT f.*, u.name as decided_by_name, u.color as decided_by_color
  FROM responsibility_findings f
  LEFT JOIN users u ON f.decision_by = u.id
  WHERE f.review_id = ?
  ORDER BY
    CASE f.severity WHEN 'HIGH' THEN 0 WHEN 'MEDIUM' THEN 1 ELSE 2 END,
    f.rule_id ASC
`;

/** 해당 목업의 가장 최근 검토 + 지적 목록 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mockupId: string }> }
) {
  try {
    const { mockupId } = await params;
    const db = getDb();

    const review = db.prepare(`
      SELECT * FROM responsibility_reviews
      WHERE mockup_version_id = ?
      ORDER BY created_at DESC, rowid DESC
      LIMIT 1
    `).get(mockupId) as { id: string } | undefined;

    if (!review) return NextResponse.json({ review: null, findings: [] });

    const findings = db.prepare(FINDINGS_QUERY).all(review.id);
    return NextResponse.json({ review, findings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '검토 결과를 불러올 수 없습니다.' }, { status: 500 });
  }
}

/** 검토 실행. 이전 검토는 남겨 두고 새 review 행을 만든다. */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ mockupId: string }> }
) {
  const { mockupId } = await params;
  const db = getDb();

  const mockup = db.prepare(
    'SELECT id, html_content, proposal_content FROM mockup_versions WHERE id = ?'
  ).get(mockupId) as
    | { id: string; html_content: string; proposal_content: string }
    | undefined;

  if (!mockup) return NextResponse.json({ error: '목업을 찾을 수 없습니다.' }, { status: 404 });

  const reviewId = uuidv4();
  db.prepare(
    'INSERT INTO responsibility_reviews (id, mockup_version_id, status, model) VALUES (?, ?, ?, ?)'
  ).run(reviewId, mockupId, 'RUNNING', REVIEW_MODEL);

  try {
    const findings = await reviewResponsibility(mockup.html_content, mockup.proposal_content);

    const insert = db.prepare(`
      INSERT INTO responsibility_findings
        (id, review_id, rule_id, category, severity, title, evidence, why, suggestion, needs_compliance_review)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertAll = db.transaction((items: typeof findings) => {
      for (const f of items) {
        insert.run(
          uuidv4(),
          reviewId,
          f.rule_id,
          f.category,
          f.severity,
          f.title,
          f.evidence,
          f.why,
          f.suggestion,
          f.needs_compliance_review ? 1 : 0
        );
      }
    });
    insertAll(findings);

    db.prepare('UPDATE responsibility_reviews SET status = ? WHERE id = ?').run('DONE', reviewId);

    const review = db.prepare('SELECT * FROM responsibility_reviews WHERE id = ?').get(reviewId);
    const rows = db.prepare(FINDINGS_QUERY).all(reviewId);
    return NextResponse.json({ review, findings: rows }, { status: 201 });
  } catch (error) {
    console.error(error);
    // 원인 문자열에 프롬프트·응답 원문이 섞이지 않도록 사용자에게는 정형 메시지만 준다
    db.prepare('UPDATE responsibility_reviews SET status = ?, error = ? WHERE id = ?').run(
      'FAILED',
      'REVIEW_FAILED',
      reviewId
    );
    return NextResponse.json({ error: '책임성 검토에 실패했습니다.' }, { status: 502 });
  }
}
