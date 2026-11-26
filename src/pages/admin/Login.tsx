import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../../config/api';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Admin username/email and password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminInfo', JSON.stringify(data.admin || {}));
        navigate('/admin', { replace: true });
      } else {
        setError(data?.error || 'Invalid admin credentials');
      }
    } catch {
      setError('Unable to reach server. Ensure server123 is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#121214] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-2xl mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div><span className="nv-section-label">Restricted Area</span></div>
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">Company Admin</h2>
            <p className="text-sm text-[#888888]">Sign in with your verified Neurovia Admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-[#888888]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                placeholder="Admin Username or Email"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#888888]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Admin Password"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In to Console'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#666666]">
            <Link to="/" className="hover:text-white transition-colors">
              ← Back to Main Website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
