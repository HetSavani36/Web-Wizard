
// admin/users/page.jsx - User Management
'use client';
import React, { useState } from 'react';
import { Plus, Download, Search, Filter, Users, Activity, User, Shield, Eye, Edit3, Mail, Star } from 'lucide-react';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const users = [
    { id: 1, name: "Alex Chen", email: "alex@example.com", role: "Editor", posts: 15, comments: 89, points: 2400, status: "Active", joined: "2024-01-15", badge: "Top Writer" },
    { id: 2, name: "Sarah Kim", email: "sarah@example.com", role: "Author", posts: 8, comments: 45, points: 1200, status: "Active", joined: "2024-02-20", badge: "Rising Star" },
    { id: 3, name: "Mike Rodriguez", email: "mike@example.com", role: "Admin", posts: 32, comments: 156, points: 4800, status: "Active", joined: "2023-11-10", badge: "Expert" },
    { id: 4, name: "Emma Davis", email: "emma@example.com", role: "Author", posts: 6, comments: 23, points: 800, status: "Inactive", joined: "2024-03-15", badge: "Newcomer" },
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      Active: 'bg-green-500/20 text-green-400 border-green-500/30',
      Inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs border font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-400 mt-1">Manage your community members and their permissions.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2">
            <Plus size={18} />
            <span>Add User</span>
          </button>
          <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-colors duration-200">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '892', change: '+8.2%', icon: Users, color: 'blue' },
          { label: 'Active Today', value: '156', change: '+12%', icon: Activity, color: 'green' },
          { label: 'New This Month', value: '47', change: '+23%', icon: User, color: 'purple' },
          { label: 'Banned Users', value: '3', change: '-50%', icon: Shield, color: 'red' },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-sm text-${stat.color === 'red' ? 'red' : 'green'}-400`}>{stat.change}</p>
              </div>
              <stat.icon className={`text-${stat.color}-400`} size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Author</option>
          </select>
          <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-700/30">
                <th className="text-left p-6 font-semibold text-gray-300">User</th>
                <th className="text-left p-6 font-semibold text-gray-300">Role</th>
                <th className="text-left p-6 font-semibold text-gray-300">Posts</th>
                <th className="text-left p-6 font-semibold text-gray-300">Points</th>
                <th className="text-left p-6 font-semibold text-gray-300">Status</th>
                <th className="text-left p-6 font-semibold text-gray-300">Joined</th>
                <th className="text-left p-6 font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-200 group">
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-blue-400 transition-colors duration-200">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">
                          {user.badge}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      user.role === 'Admin' ? 'bg-red-600/20 text-red-400' :
                      user.role === 'Editor' ? 'bg-purple-600/20 text-purple-400' :
                      'bg-blue-600/20 text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-6 text-gray-300">{user.posts}</td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-gray-300">{user.points.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-6 text-gray-400">{user.joined}</td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200">
                        <Shield size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200">
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
