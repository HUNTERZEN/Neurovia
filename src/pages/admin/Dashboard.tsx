import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Store,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Activity
} from 'lucide-react';

// Mock data for demonstration
const stats = [
  { name: 'Total Users', value: '2,543', change: '+12.5%', icon: Users, color: 'purple' },
  { name: 'Active Shops', value: '185', change: '+5.2%', icon: Store, color: 'blue' },
  { name: 'Support Tickets', value: '42', change: '-8.1%', icon: MessageSquare, color: 'green' },
  { name: 'Revenue', value: '$12,426', change: '+15.3%', icon: DollarSign, color: 'yellow' },
];

const recentActivity = [
  {
    id: 1,
    type: 'user',
    message: 'New user registration: John Doe',
    time: '5 minutes ago',
    icon: Users,
  },
  {
    id: 2,
    type: 'shop',
    message: 'New repair shop verified: TechFix Pro',
    time: '15 minutes ago',
    icon: Store,
  },
  {
    id: 3,
    type: 'ticket',
    message: 'Support ticket resolved #1234',
    time: '1 hour ago',
    icon: MessageSquare,
  },
  {
    id: 4,
    type: 'review',
    message: 'New 5-star review received',
    time: '2 hours ago',
    icon: Star,
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-1">Welcome back, Admin</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            View All Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${stat.color}-500/10 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="relative group h-full"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
          <div className="relative p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Recent Activity
            </h3>
            <div className="flex-1 space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <activity.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              View All Activity →
            </button>
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="relative group h-full"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
          <div className="relative p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Performance Overview
            </h3>
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Chart Component Will Go Here
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 