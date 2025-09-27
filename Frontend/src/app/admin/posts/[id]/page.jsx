
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
