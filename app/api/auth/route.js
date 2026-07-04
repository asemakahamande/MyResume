import { cookies } from 'next/headers';

const ADMIN_PASSWORD = 'admin123';
const SESSION_COOKIE = 'admin_session';

export async function POST(request) {
  const { password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return Response.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return Response.json({ success: true });
}
