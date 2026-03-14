import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Store, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const isPartner = localStorage.getItem('isPartner') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ UPDATED handleLogout with proper async handling and debugging
  const handleLogout = async () => {
    console.log('Logout button clicked!'); // Debug line
    console.log('Before logout:', { isAuthenticated, user }); // Debug line
    
    try {
      await logout(); // Make sure logout is awaited
      console.log('Logout completed successfully'); // Debug line
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Close menus after logout
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {user?.username || 'User'}
                  </span>
                </button>
                
                {/* User Dropdown Menu - ✅ UPDATED with better z-index and click handling */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-xl z-[60]">
                    <div className="p-3 border-b border-gray-700/50">
                      <p className="text-sm text-gray-300">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">
                        {user?.email || user?.username}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      {isPartner ? (
                        <Link
                          to="/partner/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-gray-800/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Member Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/register-partner"
                          className="flex items-center px-4 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-gray-800/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Store className="w-4 h-4 mr-2" />
                          Register as Partner
                        </Link>
                      )}
                      {/* ✅ UPDATED Sign Out button with better event handling */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLogout();
                        }}
                        type="button"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
            {/* Mobile Navigation Links */}
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

            {/* Mobile Auth Section */}
            <div className="pt-8 border-t border-gray-700/50 w-full">
              {isAuthenticated ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="text-lg font-medium text-white">
                      {user?.username || 'User'}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  {isPartner ? (
                    <Link
                      to="/partner/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-6 py-3 text-purple-400 hover:text-purple-300 transition-colors rounded-lg hover:bg-white/5"
                    >
                      <UserCheck className="w-5 h-5" />
                      <span>Member Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      to="/register-partner"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-6 py-3 text-purple-400 hover:text-purple-300 transition-colors rounded-lg hover:bg-white/5"
                    >
                      <Store className="w-5 h-5" />
                      <span>Register as Partner</span>
                    </Link>
                  )}
                  {/* ✅ UPDATED Mobile Sign Out button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    type="button"
                    className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-3 text-lg text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative px-6 py-3 bg-black rounded-lg text-lg text-white font-medium flex items-center gap-2">
                      Sign Up
                      <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform duration-200">↗</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ UPDATED Click outside to close user menu with better event handling */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={(e) => {
            e.stopPropagation();
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
}
