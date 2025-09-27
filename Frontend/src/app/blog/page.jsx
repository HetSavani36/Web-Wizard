'use client';

import { useState, useEffect } from 'react';
import { dummyPosts } from '@/lib/dummyData';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    setPosts(dummyPosts);
    setFilteredPosts(dummyPosts);
  }, []);

  // Filter & Search
  useEffect(() => {
    let temp = [...posts];

    if (searchTerm) {
      temp = temp.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      temp = temp.filter((post) => post.category === categoryFilter);
    }

    switch (sortBy) {
      case 'popular':
        temp.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'views':
        temp.sort((a, b) => b.views - a.views);
        break;
      case 'latest':
      default:
        temp.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    setFilteredPosts(temp);
  }, [searchTerm, categoryFilter, sortBy, posts]);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];

  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
        Browse All Blogs
      </h1>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between gap-4 items-center"
      >
        <div className="flex gap-4 items-center w-full md:w-auto">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Upvoted</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </motion.div>

      {/* Blog Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
          >
            <div className="relative w-full h-64">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">{post.category}</p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.summary}</p>
              <div className="flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400 text-sm">
                <span>{post.readTime}</span>
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-12">No blogs found!</p>
      )}
    </div>
  );
}
