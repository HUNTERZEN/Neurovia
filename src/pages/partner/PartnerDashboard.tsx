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
        } else {
          // Fallback to check localStorage if backend hasn't synced (optional, for safety during transition)
          const stored = localStorage.getItem('partnerData');
          if (stored) {
            try {
              setPartnerData(JSON.parse(stored));
            } catch {}
          }
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
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black">
          <p className="text-gray-400">Loading your partner profile...</p>
        </div>
      </>
    );
  }

  if (!partnerData) {
    return (
      <>
        <Navbar />
        <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative z-10 text-center">
            <Store className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Partner Data Found</h2>
            <p className="text-gray-400 mb-6">Please register as a partner first.</p>
            <Link
              to="/register-partner"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Register Now
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const stats = [
    { label: 'Total Calls', value: '0', icon: Phone, color: 'text-blue-400' },
    { label: 'Live Sessions', value: '0', icon: Video, color: 'text-purple-400' },
    { label: 'Rating', value: '5.0', icon: Star, color: 'text-yellow-400' },
    { label: 'Customers', value: '0', icon: Users, color: 'text-green-400' }
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden">
        {/* Theme background — matches website */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute left-1/4 top-0 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {partnerData.shopName}
                  </h1>
                  <p className="text-gray-400 text-sm">{partnerData.profession} • {partnerData.experience}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* Online Toggle */}
              <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800/50 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-400">Status:</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    isOnline
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                  {isOnline ? 'Online' : 'Offline'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-5"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Profile</h3>
                  <Link to="/register-partner" className="text-purple-400 hover:text-purple-300">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{partnerData.city}, {partnerData.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{partnerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{partnerData.workingHours}</span>
                  </div>
                </div>

                {/* Availability Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {partnerData.availableForCalls && (
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Calls
                    </span>
                  )}
                  {partnerData.availableForLiveService && (
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium flex items-center gap-1">
                      <Video className="w-3 h-3" /> Live Service
                    </span>
                  )}
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-400" />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {partnerData.specializations.map(spec => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Services Offered
                </h3>
                <div className="space-y-2">
                  {partnerData.servicesOffered.map(service => (
                    <div key={service} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Activity & Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Recent Activity */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Recent Activity
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <TrendingUp className="w-12 h-12 text-gray-700 mb-4" />
                  <p className="text-gray-400 font-medium">No activity yet</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Your service requests and call history will appear here
                  </p>
                </div>
              </div>

              {/* Incoming Requests */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Service Requests
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Phone className="w-12 h-12 text-gray-700 mb-4" />
                  <p className="text-gray-400 font-medium">No pending requests</p>
                  <p className="text-gray-600 text-sm mt-1">
                    When customers request your services, they'll show up here
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button className="flex items-center gap-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors text-left">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Start Live Session</p>
                      <p className="text-gray-500 text-xs">Open a video call room</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors text-left">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Edit Services</p>
                      <p className="text-gray-500 text-xs">Update your offerings</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
