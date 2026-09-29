import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.token) {
          localStorage.setItem('authToken', result.token);
        }

        setError('');
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred while signing in. Please try again.');
      console.error('SignIn error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#121214] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="nv-section-label">Account</span>
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-sm text-[#888888]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-xs">{error}</span>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="Username or Email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#121214] text-[#666666]">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors"
              onClick={() => {
                window.location.href = `${API_URL}/api/auth/google`;
              }}
            >
              <Chrome className="w-4 h-4" />
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white/[0.02] border border-white/5 text-[#555555] cursor-not-allowed rounded-xl px-4 py-2.5 text-xs font-semibold"
              disabled
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <p className="mt-7 text-center text-xs text-[#888888]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:underline font-semibold ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
