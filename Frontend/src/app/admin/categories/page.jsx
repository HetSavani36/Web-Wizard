
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
