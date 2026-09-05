import { NextRequest, NextResponse } from 'next/server';
import { getDb, type MockupVersion } from '@/lib/db';
import { ensureScreens } from '@/lib/canvas/screens';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mockupId: string }> }
) {
  try {
    const { mockupId } = await params;
    const db = getDb();
    const mockup = db
      .prepare('SELECT * FROM mockup_versions WHERE id = ?')
      .get(mockupId) as MockupVersion | undefined;
    if (!mockup) {
      return NextResponse.json({ error: '목업을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 캔버스 이전에 만들어진 목업도 화면 배열 하나의 형태로 내려간다.
    // 덕분에 클라이언트에 legacy 분기가 없다.
    const screens = ensureScreens(db, mockupId, mockup.html_content);

    return NextResponse.json({ ...mockup, screens });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '목업을 불러올 수 없습니다.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ mockupId: string }> }
) {
  try {
    const { mockupId } = await params;
    const db = getDb();
    db.prepare('DELETE FROM mockup_versions WHERE id = ?').run(mockupId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
