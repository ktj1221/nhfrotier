import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const latest = db.prepare(
      'SELECT * FROM review_summaries WHERE project_id = ? ORDER BY created_at DESC, rowid DESC LIMIT 1'
    ).get(id) as { id: string; project_id: string; created_at: string } | undefined;

    if (!latest) {
      return NextResponse.json(null);
    }

    const items = db.prepare(
      'SELECT * FROM review_items WHERE review_summary_id = ? ORDER BY created_at ASC, rowid ASC'
    ).all(latest.id);

    return NextResponse.json({ ...latest, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '의견 요약을 불러올 수 없습니다.' }, { status: 500 });
  }
}
