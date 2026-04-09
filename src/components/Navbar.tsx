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
        backgroundColor: isMobileMenuOpen ? '#000000' : (scrollY > 10 ? 'rgba(0, 0, 0, 0.8)' : 'transparent'),
        backdropFilter: (isMobileMenuOpen || scrollY > 10) ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: (isMobileMenuOpen || scrollY > 10) ? 'blur(16px)' : 'none',
        borderBottom: (isMobileMenuOpen || scrollY > 10) ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <img src="/logo.svg" className="relative h-8 w-8 sm:h-9 sm:w-9" alt="Logo" />
              </div>
              <span className="ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">Neurovia</span>
            </Link>
          </div>

          {/* Right Section: Auth (Mobile) + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="p-2 text-gray-300 hover:text-white transition-colors"
                aria-label="Profile"
              >
                <User className="h-6 w-6" />
              </Link>
            ) : (
              <Link
                to="/signin"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Log in
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors relative z-[60]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Home
            </Link>
            <Link to="/repair-shops" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Repair Shops
            </Link>
            <Link to="/remote-help" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Remote Help
            </Link>
            <Link to="/video-solutions" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Video Solutions
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              FAQ
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
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

                {/* User Dropdown Menu */}
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
        <div 
          className={`lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-black transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ paddingTop: '80px' }}
        >
          <div className="flex flex-col items-center space-y-6 p-8">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/repair-shops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Repair Shops
            </Link>
            <Link
              to="/remote-help"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Remote Help
            </Link>
            <Link
              to="/video-solutions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Video Solutions
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>

            {/* Mobile Bottom Section */}
            <div className="pt-8 border-t border-gray-800 w-full max-w-xs mx-auto">
              {isAuthenticated ? (
                <div className="flex flex-col items-center space-y-4">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <User className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">{user?.username || 'Profile'}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/5 rounded-xl text-red-400 hover:text-red-300 transition-colors w-full justify-center"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-center text-white font-semibold"
                  >
                    Get Started
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
