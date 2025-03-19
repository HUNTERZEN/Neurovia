import React, { useState, useEffect } from 'react';
import { Monitor, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrollY > 10 ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
        backdropFilter: scrollY > 10 ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrollY > 10 ? 'blur(12px)' : 'none',
        borderBottom: scrollY > 10 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-black rounded-full p-2">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="ml-3 text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Aeternex</span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 rounded-lg hover:bg-white/5"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              About
            </Link>
            <Link
              to="/features"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              Features
            </Link>
            <Link
              to="/repair-shops"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              Repair Shops
            </Link>
            <Link
              to="/remote-help"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              Remote Help
            </Link>
            <Link
              to="/faq"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative px-4 py-2 bg-black rounded-lg text-sm text-white font-medium flex items-center gap-2">
                Sign Up
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform duration-200">↗</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 