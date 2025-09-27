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
              
              {sidebarOpen && (
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Admin Panel</h1>
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