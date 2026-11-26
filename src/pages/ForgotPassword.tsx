import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../config/api';

export function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resetToken = searchParams.get('token') || '';
  const resetEmail = searchParams.get('email') || '';
  const isResetMode = Boolean(resetToken && resetEmail);

  const [email, setEmail] = useState(resetEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doneMessage, setDoneMessage] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setDoneMessage(
          data.message || 'If an account exists for that email, a password reset link has been sent.'
        );
      } else {
        setError(data.error || 'Could not process request. Please try again.');
      }
    } catch {
      setError('Unable to reach server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail,
          token: resetToken,
          password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setDoneMessage('Your password has been updated! Redirecting to Sign In...');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(data.error || 'Reset link is invalid or expired.');
      }
    } catch {
      setError('Unable to reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#121214] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="nv-section-label">Account Recovery</span>
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">
              {isResetMode ? 'Set New Password' : 'Forgot Password'}
            </h2>
            <p className="text-sm text-[#888888]">
              {isResetMode
                ? 'Choose a strong new password for your Neurovia account'
                : "Enter your account email and we'll send you a secure reset link"}
            </p>
          </div>

          {doneMessage ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-sm text-[#cccccc] leading-relaxed">{doneMessage}</p>
              <Link to="/signin" className="nv-btn-outline !text-xs inline-flex">
                ← Back to Sign In
              </Link>
            </div>
          ) : isResetMode ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#888888]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password (min 6 chars)"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#888888]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold disabled:opacity-50"
              >
                {loading ? 'Updating Password...' : 'Update Password'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequestReset} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[#888888]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold disabled:opacity-50"
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-[#888888] pt-2">
                Remembered your password?{' '}
                <Link to="/signin" className="text-white hover:underline font-semibold ml-1">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

