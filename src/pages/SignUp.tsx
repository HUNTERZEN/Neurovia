import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Chrome, Github, AlertCircle } from 'lucide-react';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setError('');
        setFormData({
          fullName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
        navigate('/signin');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] flex items-center justify-center py-20 px-4">
      {/* Main Content */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#121214] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="nv-section-label">Account</span>
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-sm text-[#888888]">Join Neurovia Nexus today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div
                className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-xs">{error}</span>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min 6 chars)"
                required
                disabled={loading}
                minLength={6}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#121214] text-[#666666]">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors"
              disabled={loading}
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
            Already have an account?{' '}
            <Link to="/signin" className="text-white hover:underline font-semibold ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
