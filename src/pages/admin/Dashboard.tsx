import React from 'react';
import {
  Users,
  Store,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Star,
  Activity
} from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '2,543', change: '+12.5%', icon: Users },
  { name: 'Active Shops', value: '185', change: '+5.2%', icon: Store },
  { name: 'Support Tickets', value: '42', change: '-8.1%', icon: MessageSquare },
  { name: 'Revenue', value: '$12,426', change: '+15.3%', icon: DollarSign },
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
    <div className="space-y-8 text-[#e8e8e8]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="nv-section-label">Management</span>
          <h1 className="font-['Syne'] text-3xl font-bold text-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#888888] mt-1">Platform metrics and operational controls</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold transition-colors">
            Download Report
          </button>
          <button className="btn-primary !px-4 !py-2 !text-xs font-bold">
            View Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="font-['Syne'] text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-xs text-[#888888]">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Activity and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08] flex flex-col">
          <h3 className="font-['Syne'] text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-white" />
            Recent Activity
          </h3>
          <div className="flex-1 space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3.5 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg shrink-0">
                  <activity.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{activity.message}</p>
                  <p className="text-[11px] text-[#888888] mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors text-center">
            View All Activity →
          </button>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08] flex flex-col">
          <h3 className="font-['Syne'] text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-white" />
            Performance Overview
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white/[0.02] border border-dashed border-white/10 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-[#888888]" />
            </div>
            <p className="text-xs font-semibold text-white">Live Telemetry Active</p>
            <p className="text-[11px] text-[#888888] mt-1">Collecting real-time platform metrics and response latencies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
