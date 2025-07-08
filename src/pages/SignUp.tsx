import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';
import type { User as UserType } from '../types/user';

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

    // Check if email or username already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((user: UserType) => user.email === formData.email)) {
      setError('Email already registered');
      return;
    }
    if (existingUsers.some((user: UserType) => user.username === formData.username)) {
      setError('Username already taken');
      return;
    }

    // Create new user
    const newUser: UserType & { password: string } = {
      id: crypto.randomUUID(),
      email: formData.email,
      username: formData.username,
      fullName: formData.fullName,
      createdAt: new Date().toISOString(),
      role: 'user',
      status: 'active',
      password: formData.password // In a real app, this should be hashed
    };

    try {
      // Save user to localStorage
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      
      // Clear form and redirect to login page
      setFormData({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
      
      navigate('/signin');
    } catch (err) {
      console.error('Error saving user:', err);
      setError('An error occurred while creating your account. Please try again.');
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
          
          {/* Sign Up Card */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400">Join our community today</p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Full Name"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Email address"
                />
              </div>

              {/* Username Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Username"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Password"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Confirm Password"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="relative w-full group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200" />
                <div className="relative w-full flex items-center justify-center bg-black rounded-xl px-6 py-3 text-white font-semibold">
                  Create Account
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

            {/* Social Sign Up Buttons */}
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

            {/* Sign In Link */}
            <p className="mt-8 text-center text-gray-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 