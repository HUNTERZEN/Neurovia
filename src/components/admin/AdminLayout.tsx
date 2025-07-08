import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  MessageSquare,
  Settings,
  ChevronLeft,
  Menu,
  LogOut,
  Activity
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Repair Shops', href: '/admin/shops', icon: Store },
  { name: 'Support Tickets', href: '/admin/tickets', icon: MessageSquare },
  { name: 'Analytics', href: '/admin/analytics', icon: Activity },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 z-50 
          ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 bg-purple-500 text-white p-1 rounded-full"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
        </button>

        {/* Logo */}
        <div className="p-6">
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60" />
              <div className="relative bg-black rounded-full p-2">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
            </div>
            {sidebarOpen && (
              <span className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Admin Panel
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-3 my-1 rounded-xl transition-colors relative group
                  ${isActive 
                    ? 'text-white bg-purple-500/10 border border-purple-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-purple-400' : ''}`} />
                {sidebarOpen && <span>{item.name}</span>}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="min-h-screen p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 