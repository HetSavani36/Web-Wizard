'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Star, TrendingUp } from 'lucide-react';
import { leaderboardData } from '@/lib/dummyData';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all-time');

  useEffect(() => {
    setTimeout(() => {
      setLeaders(leaderboardData);
      setLoading(false);
    }, 500);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 2: return 'from-gray-300 via-gray-400 to-gray-500';
      case 3: return 'from-amber-400 via-amber-500 to-amber-600';
      default: return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-8"
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
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Leaderboard
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Top contributors in our community
        </p>
      </motion.div>

      {/* Timeframe Selector */}
      <motion.div 
        className="flex justify-center gap-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {['all-time', 'this-month', 'this-week'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeframe === period
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {period.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {leaders.slice(0, 3).map((leader, index) => {
          const actualRank = leader.rank;
          const displayOrder = actualRank === 1 ? 1 : actualRank === 2 ? 0 : 2; // Center first place
          
          return (
            <motion.div
              key={leader.id}
              className={`order-${displayOrder} relative`}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <div className={`relative bg-gradient-to-br ${getRankColor(actualRank)} rounded-2xl p-6 text-white shadow-2xl ${
                actualRank === 1 ? 'md:scale-110 md:mt-0 mt-4' : 'md:mt-8'
              }`}>
                {/* Rank Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center ${
                    actualRank === 1 ? 'ring-4 ring-yellow-400' : ''
                  }`}>
                    {getRankIcon(actualRank)}
                  </div>
                </div>
                
                <div className="text-center pt-6">
                  <div className="relative mb-4">
                    {/* <Image
                      src={leader.avatar}
                      alt={leader.username}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto border-4 border-white/30"
                    /> */}
                    {/* {actualRank === 1 && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-4 border-yellow-300"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: 1, ease: "circular" }}
                      />
                    )} */}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{leader.username}</h3>
                  <div className="text-3xl font-bold mb-1">{leader.points.toLocaleString()}</div>
                  <div className="text-white/80 text-sm mb-3">points</div>
                  
                  <div className="flex justify-center gap-2">
                    {[...Array(leader.badges)].map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div 
        className="space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          All Rankings
        </h2>
        
        <div className="space-y-3">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-6">
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12">
                  {leader.rank <= 3 ? (
                    getRankIcon(leader.rank)
                  ) : (
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {leader.rank}
                    </span>
                  )}
                </div>
                
                {/* Avatar */}
                <div className="relative">
                  {/* <Image
                    src={leader.avatar}
                    alt={leader.username}
                    width={50}
                    height={50}
                    className="rounded-full"
                  /> */}
                  {leader.rank === 1 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Crown className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                
                {/* User Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {leader.username}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{leader.points.toLocaleString()} points</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{leader.badges} badges</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Level {Math.floor(leader.points / 500) + 1}
                  </div>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getRankColor(leader.rank)} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${((leader.points % 500) / 500) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Explanation */}
      <motion.div 
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          How to Earn Points
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800 dark:text-blue-200">Reading posts: +10 points</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-blue-800 dark:text-blue-200">Writing comments: +25 points</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-blue-800 dark:text-blue-200">Getting upvotes: +50 points</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

