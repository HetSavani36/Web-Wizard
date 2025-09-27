
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
