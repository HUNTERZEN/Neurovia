import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
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
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-sm text-[#888888]">Enter your credentials to access the admin console</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-xs">{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-[#888888] font-medium block" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-[#888888]" />
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#888888] font-medium block" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#888888]" />
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold mt-2"
            >
              Access Admin Panel
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}