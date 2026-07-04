'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#03060f] flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="glass-card rounded-2xl p-8 glow-cyan">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
              🔐
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-1 gradient-text"
              style={{ fontFamily: 'var(--font-space)' }}>
            Admin Panel
          </h1>
          <p className="text-slate-400 text-center text-sm mb-8">
            Enter your password to manage portfolio content
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200
                           placeholder:text-slate-500 outline-none transition-all duration-200
                           focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="login-btn"
              className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200
                         bg-gradient-to-r from-cyan-500 to-purple-500 text-white
                         hover:from-cyan-400 hover:to-purple-400 hover:scale-[1.02]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                         shadow-lg shadow-cyan-500/20"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6">
            <a
              href="/"
              className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200"
            >
              ← Back to Portfolio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
