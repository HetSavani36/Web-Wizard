
// admin/page.jsx - Dashboard Home
'use client';
import React from 'react';
import { FileText, Users, Flag, Folder, TrendingUp, Activity, Plus, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const engagementData = [
  { name: 'Jan', posts: 40, users: 24, engagement: 80 },
  { name: 'Feb', posts: 30, users: 13, engagement: 60 },
  { name: 'Mar', posts: 20, users: 98, engagement: 120 },
  { name: 'Apr', posts: 27, users: 39, engagement: 100 },
  { name: 'May', posts: 18, users: 48, engagement: 140 },
  { name: 'Jun', posts: 23, users: 38, engagement: 110 }
];

const categoryData = [
  { name: 'Tech', value: 45, color: '#3B82F6' },
  { name: 'Design', value: 25, color: '#8B5CF6' },
  { name: 'AI/ML', value: 20, color: '#10B981' },
  { name: 'Other', value: 10, color: '#F59E0B' }
];

const MetricCard = ({ title, value, change, icon: Icon, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm opacity-90 font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {change && (
          <div className="flex items-center mt-2 space-x-1">
            <TrendingUp size={14} className="text-green-300" />
            <p className="text-sm font-medium text-green-300">{change} from last month</p>
          </div>
        )}
      </div>
      <Icon size={32} className="opacity-80 group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
  </div>
);

export default function DashboardPage() {
  const recentPosts = [
    { id: 1, title: "The Future of AI in Web Development", author: "John Doe", status: "Published", views: 1250 },
    { id: 2, title: "React 19 Features Deep Dive", author: "Jane Smith", status: "Draft", views: 0 },
    { id: 3, title: "CSS Grid vs Flexbox in 2024", author: "Mike Johnson", status: "Published", views: 890 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center space-x-2">
          <Plus size={18} />
          <span>Quick Action</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Posts" 
          value="1,247" 
          change="+12.5%"
          icon={FileText}
          gradient="from-blue-600 to-blue-700"
        />
        <MetricCard 
          title="Active Users" 
          value="892" 
          change="+8.2%"
          icon={Users}
          gradient="from-purple-600 to-purple-700"
        />
        <MetricCard 
          title="Pending Reports" 
          value="23" 
          change="-15%"
          icon={Flag}
          gradient="from-red-600 to-red-700"
        />
        <MetricCard 
          title="Categories" 
          value="15" 
          change="+5%"
          icon={Folder}
          gradient="from-green-600 to-green-700"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <div className="xl:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Activity className="mr-3 text-blue-400" size={24} />
            Engagement Analytics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '12px'
                }}
              />
              <Line type="monotone" dataKey="engagement" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Folder className="mr-3 text-purple-400" size={24} />
            Categories
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Activity className="mr-3 text-green-400" size={24} />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-400">by {post.author}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${post.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}