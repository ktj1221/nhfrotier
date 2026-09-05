import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { summarizeReviews } from '@/lib/summarizeReviews';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const project = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    if (!project) {
      return NextResponse.json({ error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    const notes = db.prepare(
      'SELECT name, content FROM meeting_notes WHERE project_id = ? ORDER BY created_at ASC'
    ).all(id) as { name: string; content: string }[];

    const comments = db.prepare(`
      SELECT u.name as authorName, c.content as content
      FROM comments c
      JOIN users u ON c.user_id = u.id
      JOIN mockup_versions mv ON c.mockup_version_id = mv.id
      WHERE mv.project_id = ?
      ORDER BY c.created_at ASC
    `).all(id) as { authorName: string; content: string }[];

    const chatOpinions = db.prepare(`
      SELECT u.name as authorName, cm.content as content
      FROM chat_messages cm
      JOIN users u ON cm.user_id = u.id
      WHERE cm.project_id = ?
      ORDER BY cm.created_at ASC
    `).all(id) as { authorName: string; content: string }[];

    if (notes.length === 0 && comments.length === 0 && chatOpinions.length === 0) {
      return NextResponse.json({ error: '정리할 의견이나 회의자료가 없습니다. 회의자료를 업로드하거나 의견을 먼저 남겨주세요.' }, { status: 422 });
    }

    const items = await summarizeReviews([...comments, ...chatOpinions], notes);

    const summaryId = uuidv4();
    const insertSummary = db.prepare('INSERT INTO review_summaries (id, project_id) VALUES (?, ?)');
    const insertItem = db.prepare(
      'INSERT INTO review_items (id, review_summary_id, category, title, detail) VALUES (?, ?, ?, ?, ?)'
    );

    const tx = db.transaction(() => {
      insertSummary.run(summaryId, id);
      for (const item of items) {
        insertItem.run(uuidv4(), summaryId, item.category, item.title, item.detail);
      }
    });
    tx();

    const savedItems = db.prepare(
      'SELECT * FROM review_items WHERE review_summary_id = ? ORDER BY created_at ASC'
    ).all(summaryId);

    return NextResponse.json({ id: summaryId, items: savedItems }, { status: 201 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : '의견 정리에 실패했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
