import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';

const DATA_PATH = join(process.cwd(), 'data', 'experience.json');

async function readData() {
  try {
    const content = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeData(data) {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

export async function PUT(request, { params }) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const data = await readData();
  const idx = data.findIndex((e) => e.id === id);

  if (idx === -1) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  data[idx] = { ...data[idx], ...body, id };
  await writeData(data);

  return Response.json(data[idx]);
}

export async function DELETE(request, { params }) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const data = await readData();
  const filtered = data.filter((e) => e.id !== id);

  if (filtered.length === data.length) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  await writeData(filtered);
  return Response.json({ success: true });
}
