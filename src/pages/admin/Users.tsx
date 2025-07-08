import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle,
  User
} from 'lucide-react';
import type { User } from '../../types/user';

// Mock data - this will be replaced with actual data from localStorage
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    username: 'johndoe',
    fullName: 'John Doe',
    createdAt: '2024-03-15',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-20'
  },
  // Add more mock users as needed
];

export function Users() {
  const [users, setUsers] = useState<User[]>(() => {
    // Get users from localStorage or use mock data
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : mockUsers;
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusToggle = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-400 mt-1">Manage and monitor user accounts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <UserPlus className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search users by name, email, or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Users Table */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
        <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Last Login</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group/row hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.fullName}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(user.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 