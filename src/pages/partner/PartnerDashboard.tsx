import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Store,
  Phone,
  Video,
  Star,
  Clock,
  Users,
  TrendingUp,
  Settings,
  CheckCircle,
  MapPin,
  Wrench,
  Activity,
  Edit3
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

interface PartnerData {
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  profession: string;
  specializations: string[];
  servicesOffered: string[];
  experience: string;
  city: string;
  state: string;
  availableForCalls: boolean;
  availableForLiveService: boolean;
  workingHours: string;
  description: string;
}

export function PartnerDashboard() {
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const API_URL = import.meta.env.VITE_API_URL ?? 'https://neurovia-backend.onrender.com';
        const res = await fetch(`${API_URL}/api/partner/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setPartnerData(data.partner);
        }
      } catch (err) {
        console.error('Failed to fetch partner profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808]">
        <p className="text-[#888888]">Loading partner profile...</p>
      </div>
    );
  }

  if (!partnerData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#080808] px-6 pt-24 pb-16 text-center">
          <div className="max-w-md w-full bg-[#121214] border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 text-white">
              <Store className="w-8 h-8" />
            </div>
            <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white mb-2">
              No Partner Data Found
            </h2>
            <p className="text-sm text-[#888888] mb-8 leading-relaxed">
              You haven't registered as a partner yet. Register your workshop or technical services to start accepting repair requests.
            </p>
            <Link
              to="/register-partner"
              className="btn-primary !px-8 !py-3.5 !text-sm !w-full justify-center"
            >
              Register Now →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const stats = [
    { label: 'Total Calls', value: '0', icon: Phone, color: 'text-blue-400' },
    { label: 'Live Sessions', value: '0', icon: Video, color: 'text-emerald-400' },
    { label: 'Rating', value: '5.0', icon: Star, color: 'text-amber-400' },
    { label: 'Customers', value: '0', icon: Users, color: 'text-white' }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#080808] text-[#e8e8e8] pt-28 sm:pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-[1160px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 bg-[#121214] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white">
                <Store className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white">
                  {partnerData.shopName}
                </h1>
                <p className="text-[#888888] text-sm mt-0.5">{partnerData.profession} • {partnerData.experience}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* Online Toggle */}
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2">
                <span className="text-xs text-[#888888]">Status:</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isOnline
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-[#888888] border border-white/10'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
                  {isOnline ? 'Online' : 'Offline'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#141414] border border-white/[0.08] rounded-2xl p-5"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                <p className="font-['Syne'] text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[#888888] text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Syne'] text-lg font-bold text-white">Workshop Profile</h3>
                  <Link to="/register-partner" className="text-white hover:text-gray-300">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#888888] shrink-0" />
                    <span className="text-[#e8e8e8]">{partnerData.city}, {partnerData.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#888888] shrink-0" />
                    <span className="text-[#e8e8e8]">{partnerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#888888] shrink-0" />
                    <span className="text-[#e8e8e8]">{partnerData.workingHours}</span>
                  </div>
                </div>

                {/* Availability Badges */}
                <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {partnerData.availableForCalls && (
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white text-xs font-medium flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Calls
                    </span>
                  )}
                  {partnerData.availableForLiveService && (
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white text-xs font-medium flex items-center gap-1">
                      <Video className="w-3 h-3" /> Live Diagnostics
                    </span>
                  )}
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="font-['Syne'] text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-white/70" />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {partnerData.specializations.map(spec => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#888888] text-xs font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="font-['Syne'] text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-white/70" />
                  Services Offered
                </h3>
                <div className="space-y-2.5">
                  {partnerData.servicesOffered.map(service => (
                    <div key={service} className="flex items-center gap-2 text-sm text-[#888888]">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Activity & Requests */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="font-['Syne'] text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-white/70" />
                  Recent Activity
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <TrendingUp className="w-12 h-12 text-zinc-700 mb-3" />
                  <p className="text-white font-medium text-sm">No activity yet</p>
                  <p className="text-[#888888] text-xs mt-1">
                    Your service requests and call history will appear here.
                  </p>
                </div>
              </div>

              {/* Incoming Requests */}
              <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="font-['Syne'] text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-white/70" />
                  Service Requests
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Phone className="w-12 h-12 text-zinc-700 mb-3" />
                  <p className="text-white font-medium text-sm">No pending requests</p>
                  <p className="text-[#888888] text-xs mt-1">
                    When customers request your repair services, they'll show up here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PartnerDashboard;
