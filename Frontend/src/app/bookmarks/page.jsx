'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Search, Filter, Heart, Trash2 } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import { dummyPosts } from '@/lib/dummyData';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get bookmarked posts
    setTimeout(() => {
      // For demo, use first 2 posts as bookmarked
      const bookmarkedPosts = dummyPosts.slice(0, 2).map(post => ({
        ...post,
        bookmarkedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      setBookmarks(bookmarkedPosts);
      setFilteredBookmarks(bookmarkedPosts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = bookmarks.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    setFilteredBookmarks(filtered);
  }, [bookmarks, searchTerm, sortBy]);

  const removeBookmark = (postId) => {
    setBookmarks(bookmarks.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bookmark className="w-8 h-8 text-yellow-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            My Bookmarks
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your saved articles for later reading
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bookmarks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
        </div>
      </motion.div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredBookmarks.map((post) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="relative group"
            >
              <BlogCard post={post} />
              
              {/* Remove Bookmark Button */}
              <motion.button
                onClick={() => removeBookmark(post.id)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Remove bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
              
              {/* Bookmarked Date */}
              <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">
                Saved {new Date(post.bookmarkedAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {searchTerm ? (
            <>
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No bookmarks found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try searching for something else or clear your search.
              </p>
            </>
          ) : (
            <>
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Start bookmarking articles you want to read later!
              </p>
              <motion.a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark className="w-5 h-5" />
                Explore Articles
              </motion.a>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
