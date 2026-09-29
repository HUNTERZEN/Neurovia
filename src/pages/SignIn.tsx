import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';
import { useAuth } from '../App'; // Import useAuth

export function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ login: usernameOrEmail, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ UPDATED: Use the auth context login function
        if (result.token) {
          // Create user object from the response
          const userData = {
            id: result.user?.id || 0,
            username: result.user?.username || usernameOrEmail,
            email: result.user?.email || usernameOrEmail
          };
          
          console.log('Login successful, setting auth state:', { token: result.token, userData }); // Debug
          
          // Use context login function to set auth state
          login(result.token, userData);
        }
        
        setUsernameOrEmail('');
        setPassword('');
        navigate('/'); // Redirect to homepage
      } else {
        setError(result.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred while signing in. Please try again.');
      console.error('Sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] flex items-center justify-center py-24 px-4">
      {/* Main Content */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#121214] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="nv-section-label">Account</span>
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-sm text-[#888888]">Sign in to your Neurovia account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                <Mail className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Username or Email"
                disabled={loading}
                required
                autoComplete="username"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#555555] focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Password"
                disabled={loading}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label htmlFor="remember-me" className="flex items-center text-[#888888] cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-white accent-white mr-2"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-[#888888] hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary !w-full !rounded-xl !py-3.5 !text-sm flex items-center justify-center gap-2 font-bold disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
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

          {/* Social Login Buttons */}
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
