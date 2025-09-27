// admin/layout.jsx - Main Layout Component
'use client';
import React, { useState } from 'react';
import { 
  Home, Users, FileText, Folder, Flag, Search, Bell, Settings, 
  Menu, Zap, Star
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/posts', label: 'Posts', icon: FileText },
    { path: '/admin/categories', label: 'Categories', icon: Folder },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/reports', label: 'Reports', icon: Flag },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800/90 backdrop-blur-xl border-r border-gray-700/50 min-h-screen transition-all duration-300`}>
          {/* Logo */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="text-white" size={20} />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Admin</h1>
                  <p className="text-xs text-gray-400">Blog Platform Pro</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl mb-1 text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30 text-blue-300' 
                      : 'hover:bg-gray-700/40 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon size={20} className={`${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'} transition-colors duration-200`} />
                  {sidebarOpen && (
                    <span className={`font-medium transition-colors duration-200 ${isActive ? 'text-blue-300' : 'group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* AI Insights Widget */}
          {sidebarOpen && (
            <div className="mx-3 mt-8 p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <h3 className="text-sm font-semibold text-purple-300">AI Insights</h3>
              </div>
              <p className="text-xs text-gray-300 mb-2">Trending: Web Dev posts +28%</p>
              <p className="text-xs text-gray-300">3 reports need attention</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-gray-800/70 backdrop-blur-xl border-b border-gray-700/50 p-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                >
                  <Menu size={20} />
                </button>
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-200 w-80"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                  <Settings size={20} />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg border-2 border-gray-600/50"></div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

// ===================================================

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

// ===================================================

// admin/posts/page.jsx - Posts List
'use client';
import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit3, Trash2, Download, Star } from 'lucide-react';
import Link from 'next/link';

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const posts = [
    { id: 1, title: "Building Modern Web Apps with Next.js 14", author: "Alex Chen", status: "Published", date: "2024-09-27", views: 2540, category: "Development", featured: true },
    { id: 2, title: "AI-Powered Design Systems", author: "Sarah Kim", status: "Draft", date: "2024-09-26", views: 0, category: "Design", featured: false },
    { id: 3, title: "The Future of Machine Learning", author: "Mike Rodriguez", status: "Scheduled", date: "2024-09-28", views: 0, category: "AI", featured: true },
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      Published: 'bg-green-500/20 text-green-400 border-green-500/30',
      Draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
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
            Posts Management
          </h1>
          <p className="text-gray-400 mt-1">Manage all your blog posts and content.</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/posts/new">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2">
              <Plus size={18} />
              <span>New Post</span>
            </button>
          </Link>
          <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-colors duration-200">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-700/30">
                <th className="text-left p-6 font-semibold text-gray-300">Title</th>
                <th className="text-left p-6 font-semibold text-gray-300">Author</th>
                <th className="text-left p-6 font-semibold text-gray-300">Status</th>
                <th className="text-left p-6 font-semibold text-gray-300">Views</th>
                <th className="text-left p-6 font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-200 group">
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                      {post.featured && <Star size={16} className="text-yellow-400" />}
                      <div>
                        <p className="font-medium group-hover:text-blue-400 transition-colors duration-200">{post.title}</p>
                        <p className="text-sm text-gray-400">#{post.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-gray-300">{post.author}</td>
                  <td className="p-6">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="p-6 text-gray-300">{post.views.toLocaleString()}</td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200">
                        <Eye size={16} />
                      </button>
                      <Link href={`/admin/posts/${post.id}`}>
                        <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200">
                          <Edit3 size={16} />
                        </button>
                      </Link>
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-600/50 transition-all duration-200">
                        <Trash2 size={16} />
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

// ===================================================

// admin/posts/new/page.jsx - Create New Post
'use client';
import React, { useState } from 'react';
import { Save, Camera, Zap, Image, Globe } from 'lucide-react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Create New Post
          </h1>
          <p className="text-gray-400 mt-1">Write and publish your next amazing blog post.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="xl:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-300 mb-3">Post Title</label>
            <input
              type="text"
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-lg font-semibold transition-all duration-200"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-300 mb-3">Content</label>
            <div className="border border-gray-600/30 rounded-lg overflow-hidden">
              {/* Editor Toolbar */}
              <div className="flex items-center space-x-1 p-3 bg-gray-700/30 border-b border-gray-600/30">
                <button className="p-2 hover:bg-gray-600/50 rounded text-sm font-bold">B</button>
                <button className="p-2 hover:bg-gray-600/50 rounded text-sm italic">I</button>
                <button className="p-2 hover:bg-gray-600/50 rounded text-sm underline">U</button>
                <div className="w-px h-6 bg-gray-600/50"></div>
                <button className="p-2 hover:bg-gray-600/50 rounded text-sm">H1</button>
                <button className="p-2 hover:bg-gray-600/50 rounded text-sm">H2</button>
                <div className="w-px h-6 bg-gray-600/50"></div>
                <button className="p-2 hover:bg-gray-600/50 rounded"><Image size={16} /></button>
                <button className="p-2 hover:bg-gray-600/50 rounded"><Globe size={16} /></button>
              </div>
              <textarea
                placeholder="Write your post content here..."
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 bg-gray-700/20 focus:bg-gray-700/30 border-0 focus:ring-0 resize-none transition-all duration-200 text-gray-100 placeholder-gray-400"
              ></textarea>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-300 flex items-center">
                <Zap className="mr-2" size={20} />
                AI-Generated Summary
              </h3>
              <button className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/40 rounded-lg text-sm transition-colors duration-200">
                Generate
              </button>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Click "Generate" to create an AI-powered summary of your post content. This will help with SEO and social media sharing.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="font-semibold mb-4 text-gray-300">Post Settings</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <select className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50">
                <option>Draft</option>
                <option>Published</option>
                <option>Scheduled</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50">
                <option>Web Development</option>
                <option>AI & ML</option>
                <option>Design</option>
                <option>Mobile</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded bg-gray-700/50 border-gray-600/30" />
              <label className="text-sm text-gray-300">Featured Post</label>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="font-semibold mb-4 text-gray-300">Cover Image</h3>
            <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center hover:border-gray-500/50 transition-colors duration-200">
              <Camera className="mx-auto mb-3 text-gray-400" size={32} />
              <p className="text-sm text-gray-400 mb-2">Drop image here or click to upload</p>
              <button className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30 transition-colors duration-200">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================

// admin/posts/[id]/page.jsx - Edit Post
'use client';
import React, { useState } from 'react';
import { Save, AlertTriangle, Eye, Clock } from 'lucide-react';

export default function EditPostPage({ params }) {
  const { id } = params;
  const [title, setTitle] = useState("Building Modern Web Apps with Next.js 14");
  const [content, setContent] = useState("This is the existing content of the post...");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Edit Post
          </h1>
          <p className="text-gray-400 mt-1">Make changes to your blog post.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Clock size={16} />
            <span>Version History</span>
          </button>
          <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
            <Save size={16} />
            <span>Update</span>
          </button>
        </div>
      </div>

      {/* Editing Notice */}
      <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="text-yellow-400" size={20} />
          <p className="text-yellow-300 font-medium">Editing: "{title}" (Post ID: {id})</p>
        </div>
      </div>

      {/* Title Editor */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <label className="block text-sm font-semibold text-gray-300 mb-3">Post Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-lg font-semibold transition-all duration-200"
        />
      </div>

      {/* Content Editor */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <label className="block text-sm font-semibold text-gray-300 mb-3">Content</label>
        <textarea
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none transition-all duration-200"
        ></textarea>
      </div>

      {/* Version History Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="font-semibold mb-4 text-gray-300">Recent Changes</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium">Title updated</p>
              <p className="text-xs text-gray-400">2 hours ago by Alex Chen</p>
            </div>
            <button className="text-blue-400 text-sm hover:underline">Restore</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium">Content revision</p>
              <p className="text-xs text-gray-400">1 day ago by Alex Chen</p>
            </div>
            <button className="text-blue-400 text-sm hover:underline">Restore</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================

// admin/categories/page.jsx - Categories Management
'use client';
import React, { useState } from 'react';
import { Plus, Folder, TrendingUp, FileText, Edit3, Trash2, MoreHorizontal } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: "Web Development", posts: 156, color: "bg-blue-500", trending: true, growth: "+12%" },
    { id: 2, name: "AI & Machine Learning", posts: 89, color: "bg-purple-500", trending: true, growth: "+28%" },
    { id: 3, name: "UI/UX Design", posts: 67, color: "bg-pink-500", trending: false, growth: "+5%" },
    { id: 4, name: "Mobile Development", posts: 45, color: "bg-green-500", trending: false, growth: "-2%" },
    { id: 5, name: "DevOps", posts: 34, color: "bg-yellow-500", trending: true, growth: "+18%" },
    { id: 6, name: "Cybersecurity", posts: 28, color: "bg-red-500", trending: false, growth: "+3%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Categories Management
          </h1>
          <p className="text-gray-400 mt-1">Organize your content with categories.</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Categories</p>
              <p className="text-3xl font-bold text-blue-400">15</p>
            </div>
            <Folder className="text-blue-400" size={32} />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Most Popular</p>
              <p className="text-xl font-semibold text-purple-400">Web Development</p>
            </div>
            <TrendingUp className="text-purple-400" size={32} />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Posts</p>
              <p className="text-3xl font-bold text-green-400">485</p>
            </div>
            <FileText className="text-green-400" size={32} />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-5 h-5 rounded-full ${category.color}`}></div>
              <div className="flex items-center space-x-1">
                {category.trending && (
                  <div className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs flex items-center space-x-1">
                    <TrendingUp size={12} />
                    <span>Trending</span>
                  </div>
                )}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-600/50 rounded">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-200">
              {category.name}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>{category.posts} posts</span>
              <span className="text-green-400">{category.growth}</span>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30 transition-colors duration-200 flex items-center justify-center space-x-1">
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm hover:bg-red-600/30 transition-colors duration-200">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal Trigger */}
      <div className="bg-gray-800/30 border-2 border-dashed border-gray-600/50 rounded-xl p-8 text-center hover:border-gray-500/50 transition-colors duration-200 cursor-pointer">
        <Plus className="mx-auto mb-3 text-gray-400" size={32} />
        <p className="text-gray-400 font-medium">Add New Category</p>
        <p className="text-sm text-gray-500 mt-1">Click to create a new category</p>
      </div>
    </div>
  );
}

// ===================================================

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

// ===================================================

// admin/reports/page.jsx - Reports Management  
'use client';
import React, { useState } from 'react';
import { Download, Search, Flag, Clock, CheckCircle, AlertTriangle, Eye, XCircle, Shield, Zap } from 'lucide-react';

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const reports = [
    { id: 1, post: "Controversial AI Ethics Discussion", reporter: "user_234", reason: "Inappropriate Content", severity: "High", date: "2024-09-27", status: "Pending" },
    { id: 2, post: "Spam Link in Comments", reporter: "moderator_45", reason: "Spam", severity: "Medium", date: "2024-09-26", status: "Resolved" },
    { id: 3, post: "Plagiarized Content", reporter: "user_789", reason: "Copyright", severity: "High", date: "2024-09-25", status: "Under Review" },
    { id: 4, post: "Off-topic Discussion", reporter: "user_123", reason: "Off-topic", severity: "Low", date: "2024-09-24", status: "Dismissed" },
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      High: 'bg-red-500/20 text-red-400 border-red-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-green-500/20 text-green-400 border-green-500/30',
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Under Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
      Dismissed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
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
            Content Reports
          </h1>
          <p className="text-gray-400 mt-1">Review and moderate reported content to maintain community standards.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-colors duration-200 flex items-center space-x-2">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Reports Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Reports', value: '23', color: 'red', icon: Flag },
          { label: 'Pending Review', value: '8', color: 'yellow', icon: Clock },
          { label: 'Resolved', value: '15', color: 'green', icon: CheckCircle },
          { label: 'High Priority', value: '3', color: 'red', icon: AlertTriangle },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              </div>
              <stat.icon className={`text-${stat.color}-400`} size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-purple-300 flex items-center">
            <Zap className="mr-2" size={20} />
            AI-Powered Insights
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3">
            <p className="text-yellow-300 font-medium">⚠️ Repeat Offender Alert</p>
            <p className="text-gray-300 mt-1">User "user_234" has 3 reports in the last week</p>
          </div>
          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
            <p className="text-green-300 font-medium">📈 Report Trend</p>
            <p className="text-gray-300 mt-1">Spam reports decreased by 40% this month</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg">
            <option>All Severity</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg">
            <option>All Status</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-700/30">
                <th className="text-left p-6 font-semibold text-gray-300">Content</th>
                <th className="text-left p-6 font