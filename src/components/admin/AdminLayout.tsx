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
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#121214] border-r border-white/[0.08] transition-all duration-300 z-50 
          ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 bg-white text-[#080808] p-1 rounded-full shadow-lg hover:bg-neutral-200 transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <Menu size={14} />}
        </button>

        {/* Logo */}
        <div className="p-6">
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white text-[#080808] rounded-xl flex items-center justify-center font-['Syne'] font-black text-lg">
              N
            </div>
            {sidebarOpen && (
              <span className="font-['Syne'] text-base font-bold text-white tracking-tight">
                Admin Console
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 my-1 rounded-xl text-xs font-semibold transition-colors relative group
                  ${isActive 
                    ? 'text-white bg-white/10 border border-white/15' 
                    : 'text-[#888888] hover:text-white hover:bg-white/[0.04]'
                  }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#888888]'}`} />
                {sidebarOpen && <span>{item.name}</span>}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-[#18181c] border border-white/10 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#888888] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
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