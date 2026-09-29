import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Wrench } from 'lucide-react';
import API_BASE_URL from '../../config/api';

export function TechnicianSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/technician/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('technicianToken', result.token);
        localStorage.setItem('technicianData', JSON.stringify(result.technician));
        navigate('/technician/dashboard');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error('Technician sign-in error:', err);
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
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div><span className="nv-section-label">Portal</span></div>
            <h2 className="font-['Syne'] text-3xl font-bold text-white mb-2">Technician Portal</h2>
            <p className="text-sm text-[#888888]">Sign in to access your dashboard</p>
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
                <Mail className="h-4 w-4 text-[#888888]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="Technician Email"
                disabled={loading}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                placeholder="Password"
                disabled={loading}
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#888888] pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="rounded border-white/20 bg-white/5 text-white focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/technician/forgot-password"
                className="hover:text-white transition-colors"
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

          <p className="mt-8 text-center text-xs text-[#888888]">
            Need a technician account?{' '}
            <Link to="/contact" className="text-white hover:underline font-semibold ml-1">
              Contact Admin
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-[#666666]">
            <Link to="/" className="hover:text-white transition-colors">
              ← Back to Main Site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
