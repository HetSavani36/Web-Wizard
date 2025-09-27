
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