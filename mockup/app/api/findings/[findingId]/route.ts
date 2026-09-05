import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { FindingDecision } from '@/lib/db';

const DECISIONS: FindingDecision[] = ['ACCEPTED', 'DEFERRED', 'REJECTED', 'COMPLIANCE_REQUESTED'];

/** 지적에 대한 담당자 결정 기록 — 반영 / 보류 / 반려 / 준법 검토 요청 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ findingId: string }> }
) {
  try {
    const { findingId } = await params;
    const { userId, decision, reason } = await req.json();

    if (!userId) return NextResponse.json({ error: '사용자를 선택해주세요.' }, { status: 400 });
    if (!DECISIONS.includes(decision)) {
      return NextResponse.json({ error: '올바르지 않은 결정입니다.' }, { status: 400 });
    }

    const db = getDb();

    // finding → review → mockup_version 이 모두 살아 있는지 확인한다
    const target = db.prepare(`
      SELECT f.id
      FROM responsibility_findings f
      JOIN responsibility_reviews r ON f.review_id = r.id
      JOIN mockup_versions m ON r.mockup_version_id = m.id
      WHERE f.id = ?
    `).get(findingId);
    if (!target) return NextResponse.json({ error: '검토 항목을 찾을 수 없습니다.' }, { status: 404 });

    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if (!user) return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });

    db.prepare(`
      UPDATE responsibility_findings
      SET decision = ?, decision_by = ?, decision_reason = ?, decided_at = datetime('now')
      WHERE id = ?
    `).run(decision, userId, typeof reason === 'string' && reason.trim() ? reason.trim() : null, findingId);

    const finding = db.prepare(`
      SELECT f.*, u.name as decided_by_name, u.color as decided_by_color
      FROM responsibility_findings f
      LEFT JOIN users u ON f.decision_by = u.id
      WHERE f.id = ?
    `).get(findingId);

    return NextResponse.json(finding);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '결정을 저장하지 못했습니다.' }, { status: 500 });
  }
}
