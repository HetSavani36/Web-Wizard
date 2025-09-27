'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Heart, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Blogesh</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A modern blogging platform built for creators and readers who love great content and community interaction.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/blog', label: 'All Posts' },
                { href: '/categories', label: 'Categories' },
                { href: '/leaderboard', label: 'Leaderboard' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div> AI-Powered Summaries</div>
              <div> Voice Search & Reading</div>
              <div> Gamification System</div>
              <div> Smart Bookmarking</div>
              <div> Interactive Comments</div>
              <div> Dark Mode Support</div>
            </div>
          </div>

          {/* Community Stats */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Community</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">1.2k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">850+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Articles Published</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">3.5k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Comments Posted</div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Blogesh.
          </div>
          <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}