import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Auth guard — only wraps /admin (dashboard), NOT /admin/login
export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
