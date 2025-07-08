import React, { useState, useEffect } from 'react';
import { Monitor, Home, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" className="h-8 w-8" alt="Logo" />
              <span className="ml-3 text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Neurovia</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/repair-shops" className="text-gray-300 hover:text-white transition-colors">
              Repair Shops
            </Link>
            <Link to="/remote-help" className="text-gray-300 hover:text-white transition-colors">
              Remote Help
            </Link>
            <Link to="/video-solutions" className="text-gray-300 hover:text-white transition-colors">
              Video Solutions
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8 p-8">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/repair-shops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              Repair Shops
            </Link>
            <Link
              to="/remote-help"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              Remote Help
            </Link>
            <Link
              to="/video-solutions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              Video Solutions
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 