'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Edit3, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Bookmark,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Settings
} from 'lucide-react';
import { dummyUsers } from '@/lib/dummyData';
import BadgeDisplay from '@/components/user/BadgeDisplay';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser(dummyUsers.currentUser);
      setEditedBio(dummyUsers.currentUser.bio);
      setLoading(false);
    }, 500);
  }, []);

  const handleSaveProfile = () => {
    if (user) {
      setUser({ ...user, bio: editedBio });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { label: 'Posts Read', value: user.postsRead, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Comments', value: user.commentsCount, icon: MessageSquare, color: 'text-green-600' },
    { label: 'Bookmarks', value: user.bookmarksCount, icon: Bookmark, color: 'text-yellow-600' },
    { label: 'Points', value: user.points, icon: Trophy, color: 'text-purple-600' },
  ];

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <motion.div 
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            {/* <Image
              src={user.avatar}
              alt={user.username}
              width={100}
              height={100}
              className="rounded-full border-4 border-white/20"
            /> */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Level {Math.floor(user.points / 500) + 1}</span>
              </div>
            </div>
            <p className="text-white/90">{user.email}</p>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? <Settings className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ y: -5 }}
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bio Section */}
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            About Me
          </h2>
          
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              />
              <div className="flex gap-2">
                <motion.button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBio(user.bio);
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {user.bio}
            </p>
          )}
        </motion.div>

        {/* Badges & Achievements */}
        <motion.div 
          className="space-y-6"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <BadgeDisplay badges={user.badges} points={user.points} />
          
          {/* Favorite Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Favorite Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.favoriteCategories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
