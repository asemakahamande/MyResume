import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';

const CV_DATA_PATH = join(process.cwd(), 'data', 'cv.json');
const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads');

async function readCVData() {
  try {
    const content = await readFile(CV_DATA_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { filename: null, originalName: null, uploadedAt: null };
  }
}

async function writeCVData(data) {
  await writeFile(CV_DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

export async function GET() {
  const data = await readCVData();
  return Response.json(data);
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('cv');

  if (!file || typeof file === 'string') {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: 'Only PDF and Word documents are allowed' }, { status: 400 });
  }

  // Ensure uploads directory exists
  await mkdir(UPLOADS_DIR, { recursive: true });

  const ext = file.name.split('.').pop();
  const filename = `cv_asemakaha.${ext}`;
  const filepath = join(UPLOADS_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const cvData = {
    filename,
    originalName: file.name,
    uploadedAt: new Date().toISOString(),
  };
  await writeCVData(cvData);

  return Response.json({ success: true, ...cvData });
}
