import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import type { User } from '../types/user';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]') as (User & { password: string })[];
      const user = users.find(u => u.email === formData.email);

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      // Check password
      if (formData.password !== user.password) {
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

      // Clear form
      setFormData({
        email: '',
        password: ''
      });

      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your account
          </p>
        </motion.div>

        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-800 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-800 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-800 rounded bg-gray-900/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="text-purple-400 hover:text-purple-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 