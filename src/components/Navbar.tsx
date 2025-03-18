import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Monitor } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/95 sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Monitor className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-white">Aeternex</span>
          </Link>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/remote-support"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/remote-support')
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                Remote Support
              </Link>
              <Link
                to="/repair-shops"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/repair-shops')
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                Repair Shops
              </Link>
              <Link
                to="/expert-chat"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/expert-chat')
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                Expert Chat
              </Link>
              <Link
                to="/sign-in"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}