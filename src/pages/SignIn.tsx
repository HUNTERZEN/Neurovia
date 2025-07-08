import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';
import type { User } from '../types/user';

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]') as (User & { password: string })[];
      const user = users.find(u => u.email === email);

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      // Check password
      if (password !== user.password) {
        setError('Invalid email or password');
        return;
      }

      // Update last login
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return {
            ...u,
            lastLogin: new Date().toISOString()
          };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Store authentication state
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      // Clear form and redirect to home page
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      console.error('Error during sign in:', err);
      setError('An error occurred while signing in. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative w-full max-w-md mx-auto px-6">
        <div className="relative">
          {/* Card Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25" />
          
          {/* Sign In Card */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to your account</p>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm font-medium text-purple-400 hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="relative w-full group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200" />
                <div className="relative w-full flex items-center justify-center bg-black rounded-xl px-6 py-3 text-white font-semibold">
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/80 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-white rounded-xl px-6 py-3 font-medium transition-colors">
                <Chrome className="w-5 h-5" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-white rounded-xl px-6 py-3 font-medium transition-colors">
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}