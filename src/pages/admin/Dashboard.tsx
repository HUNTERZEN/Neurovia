import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Store,
  MessageSquare,
  IndianRupee,
  Sparkles,
  Wrench,
  RefreshCw,
} from 'lucide-react';
import API_BASE_URL from '../../config/api';

interface OverviewStats {
  totalUsers: number;
  totalPartners: number;
  totalMessages: number;
  unreadMessages: number;
  totalBookings: number;
  pendingBookings: number;
  totalBetaTesters: number;
  totalNewsletter: number;
  totalRevenueInr: number;
  paidOrdersCount: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch(`${API_BASE_URL}/api/admin/overview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login', { replace: true });
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentMessages(data.recentMessages || []);
        setRecentBookings(data.recentBookings || []);
        setRecentPayments(data.recentPayments || []);
      }
    } catch (err) {
      console.error('Failed to load admin overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  const cards = [
    {
      name: 'Get in Touch Messages',
      value: stats ? String(stats.totalMessages) : '—',
      sub: stats ? `${stats.unreadMessages} unread` : '',
      icon: MessageSquare,
      href: '/admin/tickets',
    },
    {
      name: 'Support Bookings',
      value: stats ? String(stats.totalBookings) : '—',
      sub: stats ? `${stats.pendingBookings} pending` : '',
      icon: Wrench,
      href: '/admin/tickets',
    },
    {
      name: 'Razorpay Revenue',
      value: stats ? `₹${stats.totalRevenueInr.toLocaleString('en-IN')}` : '—',
      sub: stats ? `${stats.paidOrdersCount} paid orders` : '',
      icon: IndianRupee,
      href: '/admin/analytics',
    },
    {
      name: 'Beta Testers',
      value: stats ? String(stats.totalBetaTesters) : '—',
      sub: stats ? `${stats.totalNewsletter} newsletter` : '',
      icon: Sparkles,
      href: '/admin/settings',
    },
    {
      name: 'Registered Users',
      value: stats ? String(stats.totalUsers) : '—',
      sub: 'Platform accounts',
      icon: Users,
      href: '/admin/users',
    },
    {
      name: 'Partner Workshops',
      value: stats ? String(stats.totalPartners) : '—',
      sub: 'Verified shops',
      icon: Store,
      href: '/admin/shops',
    },
  ];

  return (
    <div className="space-y-8 text-[#e8e8e8]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="nv-section-label">Company Operations</span>
          <h1 className="font-['Syne'] text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-[#888888] mt-1">
            Live customer inquiries, support bookings, beta registrations &amp; Razorpay payments
          </p>
        </div>
        <button
          type="button"
          onClick={loadOverview}
          disabled={loading}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="p-6 bg-[#141414] hover:bg-[#18181c] rounded-2xl border border-white/[0.08] hover:border-white/20 transition-all block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#8bb4ff]">{stat.sub}</span>
            </div>
            <h3 className="font-['Syne'] text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-xs text-[#888888]">{stat.name}</p>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Syne'] text-lg font-bold text-white">Recent Get-in-Touch Messages</h3>
            <Link to="/admin/tickets" className="text-xs text-[#8bb4ff] hover:underline">
              View all →
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-xs text-[#888888] py-8 text-center">No contact messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m._id} className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-bold text-white truncate">{m.subject}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4f7fff]/15 text-[#8bb4ff] uppercase font-semibold shrink-0">
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#aaaaaa] mt-1 line-clamp-2">{m.message}</p>
                  <p className="text-[11px] text-[#777777] mt-1.5">
                    {m.name} · {m.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Syne'] text-lg font-bold text-white">Recent Bookings &amp; Payments</h3>
            <Link to="/admin/analytics" className="text-xs text-[#8bb4ff] hover:underline">
              Payments →
            </Link>
          </div>
          {recentBookings.length === 0 && recentPayments.length === 0 ? (
            <p className="text-xs text-[#888888] py-8 text-center">No bookings or payments yet.</p>
          ) : (
            <div className="space-y-3">
              {recentPayments.map((p) => (
                <div key={p._id} className="p-3.5 bg-emerald-500/[0.05] border border-emerald-500/20 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{p.serviceTitle}</span>
                    <span className="text-xs font-bold text-emerald-400">₹{p.amountInr} PAID</span>
                  </div>
                  <p className="text-[11px] text-[#888888] mt-1">
                    {p.customerName} ({p.customerEmail}) · {p.receiptNumber}
                  </p>
                </div>
              ))}
              {recentBookings.map((b) => (
                <div key={b._id} className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">
                      {b.bookingNumber} · {b.deviceType}
                    </span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#cccccc]">
                      {b.supportType}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#888888] mt-1">
                    {b.customerName} · {b.phone} · {b.paymentStatus}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
