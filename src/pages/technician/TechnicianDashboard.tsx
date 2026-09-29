import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Settings, LogOut, Clock, CheckCircle, 
  AlertTriangle, Users, Star, MessageSquare, Phone,
  Monitor, Wrench, Award
} from 'lucide-react';
import API_BASE_URL from '../../config/api';

interface TechnicianData {
  id: number;
  name: string;
  email: string;
  specialization: string;
  rating: number;
  totalTickets: number;
  resolvedTickets: number;
  activeTickets: number;
}

export function TechnicianDashboard() {
  const navigate = useNavigate();
  const [technician, setTechnician] = useState<TechnicianData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        const token = localStorage.getItem('technicianToken');
        if (!token) {
          navigate('/technician/signin');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/technician/profile`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTechnician(data.technician);
        } else {
          navigate('/technician/signin');
        }
      } catch (error) {
        console.error('Failed to fetch technician data:', error);
        navigate('/technician/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('technicianToken');
      await fetch(`${API_BASE_URL}/api/technician/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    localStorage.removeItem('technicianToken');
    localStorage.removeItem('technicianData');
    navigate('/technician/signin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-[#888888]">Loading dashboard...</div>
      </div>
    );
  }

  if (!technician) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      {/* Header */}
      <header className="bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-['Syne'] text-lg font-bold text-white leading-tight">Neurovia Technician Portal</h1>
                <p className="text-[#888888] text-xs">Welcome back, {technician.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/technician/profile')}
                className="p-2 text-[#888888] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                title="Profile Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/5 hover:bg-red-500/20 text-[#888888] hover:text-red-400 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] rounded-2xl p-5 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider font-medium">Total Tickets</p>
                <p className="font-['Syne'] text-3xl font-bold text-white mt-1">{technician.totalTickets}</p>
              </div>
              <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl p-5 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider font-medium">Resolved</p>
                <p className="font-['Syne'] text-3xl font-bold text-white mt-1">{technician.resolvedTickets}</p>
              </div>
              <div className="w-11 h-11 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl p-5 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider font-medium">Active</p>
                <p className="font-['Syne'] text-3xl font-bold text-white mt-1">{technician.activeTickets}</p>
              </div>
              <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl p-5 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider font-medium">Rating</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <p className="font-['Syne'] text-3xl font-bold text-white">{technician.rating}</p>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/remote-help')}
            className="bg-[#141414] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 p-6 rounded-2xl transition-all text-left group"
          >
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] text-base font-bold text-white mb-1">Start Remote Session</h3>
            <p className="text-xs text-[#888888]">Connect with customers for instant diagnostic sessions</p>
          </button>

          <button
            onClick={() => navigate('/repair-shops')}
            className="bg-[#141414] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 p-6 rounded-2xl transition-all text-left group"
          >
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] text-base font-bold text-white mb-1">View Tickets</h3>
            <p className="text-xs text-[#888888]">Manage client support and repair requests</p>
          </button>

          <button
            onClick={() => navigate('/technician/profile')}
            className="bg-[#141414] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 p-6 rounded-2xl transition-all text-left group"
          >
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black text-white transition-colors">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] text-base font-bold text-white mb-1">My Profile</h3>
            <p className="text-xs text-[#888888]">Update credentials, certifications, and availability</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
          <h3 className="font-['Syne'] text-base font-bold text-white mb-5">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Resolved ticket #1234</p>
                <p className="text-[11px] text-[#888888]">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <MessageSquare className="w-4 h-4 text-white shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Customer feedback received</p>
                <p className="text-[11px] text-[#888888]">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">New urgent ticket assigned</p>
                <p className="text-[11px] text-[#888888]">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
