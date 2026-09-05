import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_TYPES = ['text/plain', 'text/markdown', 'application/octet-stream'];
const ALLOWED_EXTENSIONS = ['.txt', '.md'];
const MAX_SIZE = 300 * 1024; // 300KB
const MAX_NOTES_PER_PROJECT = 5;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const notes = db.prepare(
      'SELECT id, project_id, name, created_at FROM meeting_notes WHERE project_id = ? ORDER BY created_at ASC'
    ).all(id);
    return NextResponse.json(notes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '회의자료 목록을 불러올 수 없습니다.' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const project = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    if (!project) {
      return NextResponse.json({ error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    const existingCount = (db.prepare(
      'SELECT COUNT(*) as count FROM meeting_notes WHERE project_id = ?'
    ).get(id) as { count: number }).count;

    if (existingCount >= MAX_NOTES_PER_PROJECT) {
      return NextResponse.json({ error: `회의자료는 최대 ${MAX_NOTES_PER_PROJECT}개까지 등록할 수 있습니다.` }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string | null;

    if (!file) {
      return NextResponse.json({ error: '파일을 선택해주세요.' }, { status: 400 });
    }

    const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!ALLOWED_TYPES.includes(file.type) || !hasAllowedExtension) {
      return NextResponse.json({ error: 'TXT, MD 텍스트 형식만 지원합니다.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: '파일 크기는 300KB 이하여야 합니다.' }, { status: 400 });
    }

    const content = await file.text();
    if (!content.trim()) {
      return NextResponse.json({ error: '파일 내용이 비어있습니다.' }, { status: 400 });
    }

    const noteId = uuidv4();
    const noteName = name?.trim() || file.name || `회의자료 ${existingCount + 1}`;

    db.prepare(`
      INSERT INTO meeting_notes (id, project_id, name, content)
      VALUES (?, ?, ?, ?)
    `).run(noteId, id, noteName, content);

    return NextResponse.json({ id: noteId, name: noteName }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '회의자료 업로드에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { noteId } = await req.json();
    const db = getDb();
    db.prepare('DELETE FROM meeting_notes WHERE id = ? AND project_id = ?').run(noteId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
