'use client';

import { motion } from 'framer-motion';
import { Award, Star, Crown, Zap } from 'lucide-react';

const badgeIcons = {
  'Early Adopter': Star,
  'Top Commenter': Award,
  'Bookworm': Crown,
  'Rising Star': Zap,
};

const badgeColors = {
  'Early Adopter': 'from-yellow-400 to-orange-500',
  'Top Commenter': 'from-blue-400 to-blue-600',
  'Bookworm': 'from-purple-400 to-purple-600',
  'Rising Star': 'from-pink-400 to-red-500',
};

export default function BadgeDisplay({ badges, points }) {
  const currentLevel = Math.floor(points / 500) + 1;
  const nextLevelPoints = currentLevel * 500;
  const progressPercent = ((points % 500) / 500) * 100;

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Award className="w-5 h-5 text-yellow-500" />
        Achievements
      </h3>

      {/* Level Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Level {currentLevel}</span>
          <span className="text-gray-600 dark:text-gray-400">{points}/{nextLevelPoints}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">Badges Earned</h4>
        <div className="space-y-2">
          {badges.map((badge, index) => {
            const Icon = badgeIcons[badge] || Award;
            const gradientColor = badgeColors[badge] || 'from-gray-400 to-gray-600';
            
            return (
              <motion.div
                key={badge}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{badge}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Earned recently
                  </div>
                </div>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

