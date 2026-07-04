// Simple passthrough — no auth check here.
// Auth is handled by app/admin/(protected)/layout.js
export default function AdminRootLayout({ children }) {
  return <>{children}</>;
}
