import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  MessageSquare,
  CreditCard,
  Sparkles,
  ChevronLeft,
  Menu,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Messages & Bookings', href: '/admin/tickets', icon: MessageSquare },
  { name: 'Razorpay Payments', href: '/admin/analytics', icon: CreditCard },
  { name: 'Beta & Newsletter', href: '/admin/settings', icon: Sparkles },
  { name: 'Partner Shops', href: '/admin/shops', icon: Store },
  { name: 'Users', href: '/admin/users', icon: Users },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#121214] border-r border-white/[0.08] transition-all duration-300 z-50 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 bg-white text-[#080808] p-1 rounded-full shadow-lg hover:bg-neutral-200 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <Menu size={14} />}
        </button>

        <div className="p-6">
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white text-[#080808] rounded-xl flex items-center justify-center font-['Syne'] font-black text-lg shrink-0">
              N
            </div>
            {sidebarOpen && (
              <span className="font-['Syne'] text-base font-bold text-white tracking-tight">
                Neurovia Console
              </span>
            )}
          </Link>
        </div>

        <nav className="mt-2 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors relative group ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/15'
                    : 'text-[#888888] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#888888]'}`} />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/[0.06] space-y-1">
          <Link
            to="/"
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#888888] hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Main Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#888888] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="min-h-screen p-5 sm:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
