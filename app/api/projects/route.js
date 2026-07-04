import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const DATA_PATH = join(process.cwd(), 'data', 'projects.json');

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

function isAuthenticated(cookieStore) {
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

export async function GET() {
  const data = await readData();
  return Response.json(data);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const data = await readData();
  const newEntry = { id: randomUUID(), ...body };
  data.unshift(newEntry);
  await writeData(data);

  return Response.json(newEntry, { status: 201 });
}
