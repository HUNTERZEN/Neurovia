import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Settings, LogOut, Calendar, Clock, CheckCircle, 
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  if (!technician) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Neurovia Technician Portal</h1>
                <p className="text-gray-400 text-sm">Welcome back, {technician.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/technician/profile')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Tickets</p>
                <p className="text-2xl font-bold text-white">{technician.totalTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{technician.resolvedTickets}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-yellow-400">{technician.activeTickets}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-purple-400">{technician.rating}</p>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-6 rounded-xl transition-all transform hover:scale-105"
          >
            <Phone className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">Start Remote Session</h3>
            <p className="text-blue-100">Connect with customers instantly</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-xl transition-all transform hover:scale-105"
          >
            <Users className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">View Tickets</h3>
            <p className="text-green-100">Manage support requests</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/technician/profile')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-xl transition-all transform hover:scale-105"
          >
            <User className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">My Profile</h3>
            <p className="text-purple-100">Update profile information</p>
          </motion.button>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white">Resolved ticket #1234</p>
                <p className="text-gray-400 text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white">Customer feedback received</p>
                <p className="text-gray-400 text-sm">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white">New urgent ticket assigned</p>
                <p className="text-gray-400 text-sm">6 hours ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
