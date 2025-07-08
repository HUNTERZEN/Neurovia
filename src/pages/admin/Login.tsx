import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      // Store auth state in localStorage
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
          <div className="relative p-8 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60" />
                  <div className="relative bg-black p-3 rounded-full">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Admin Login
              </h2>
              <p className="text-gray-400 mt-2">Enter your credentials to access the admin panel</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-gray-400 text-sm" htmlFor="username">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
                  <div className="relative flex items-center">
                    <span className="absolute left-3">
                      <User className="h-5 w-5 text-gray-500" />
                    </span>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-900/80 backdrop-blur-xl text-white pl-10 pr-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter username"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
                  <div className="relative flex items-center">
                    <span className="absolute left-3">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </span>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-900/80 backdrop-blur-xl text-white pl-10 pr-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                <div className="relative px-6 py-3 bg-black rounded-lg text-white font-semibold">
                  Login to Admin Panel
                </div>
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 