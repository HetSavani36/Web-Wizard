'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  BookOpen, 
  Grid3X3, 
  Bookmark, 
  User, 
  Trophy,
  Bell,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [logoHovered, setLogoHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Generate sparkle particles
  useEffect(() => {
    if (logoHovered) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        delay: Math.random() * 0.5
      }));
      setSparkles(newSparkles);
    }
  }, [logoHovered]);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const logoVariants = {
    idle: {
      scale: 1,
      rotateY: 0,
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    },
    hover: {
      scale: 1.1,
      rotateY: [0, 360],
      background: [
        'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        'linear-gradient(135deg, #EF4444, #F59E0B)',
        'linear-gradient(135deg, #10B981, #3B82F6)',
        'linear-gradient(135deg, #8B5CF6, #EC4899)',
        'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      ],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        background: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }
      }
    }
  };

  const textVariants = {
    idle: {
      backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      backgroundSize: '100%',
    },
    hover: {
      backgroundImage: [
        'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        'linear-gradient(135deg, #EF4444, #F59E0B)',
        'linear-gradient(135deg, #10B981, #3B82F6)',
        'linear-gradient(135deg, #8B5CF6, #EC4899)',
        'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      ],
      backgroundSize: ['100%', '200%', '100%'],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  const sparkleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0, 
      rotate: 0 
    },
    visible: (custom) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180],
      x: [0, custom.x],
      y: [0, custom.y],
      transition: {
        duration: 1.5,
        delay: custom.delay,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer relative"
            onHoverStart={() => setLogoHovered(true)}
            onHoverEnd={() => setLogoHovered(false)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg"
                variants={logoVariants}
                initial="idle"
                animate={logoHovered ? "hover" : "idle"}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                }}
              >
                {/* Animated rays */}
                <motion.div
                  className="absolute inset-0"
                  animate={logoHovered ? {
                    background: [
                      'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                      'conic-gradient(from 360deg, transparent, rgba(255,255,255,0.3), transparent)'
                    ]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  animate={logoHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <BookOpen className="w-6 h-6 text-white relative z-10" />
                </motion.div>

                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/30 rounded-xl"
                  animate={logoHovered ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0, 0.3]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Sparkle particles */}
              {/* <AnimatePresence>
                {logoHovered && sparkles.map((sparkle) => (
                  <motion.div
                    key={sparkle.id}
                    className="absolute top-1/2 left-1/2 text-yellow-400"
                    variants={sparkleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={sparkle}
                    style={{ 
                      transformOrigin: 'center',
                      marginLeft: '-6px',
                      marginTop: '-6px'
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                ))}
              </AnimatePresence> */}
            </div>

            <motion.span 
              className="text-2xl font-bold bg-clip-text text-transparent"
              variants={textVariants}
              initial="idle"
              animate={logoHovered ? "hover" : "idle"}
              style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Blogesh
            </motion.span>

            {/* Floating elements */}
            {/* <AnimatePresence>
              {logoHovered && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    y: [-2, -6, -2]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.5,
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Zap className="w-4 h-4 text-yellow-500" />
                </motion.div>
              )}
            </AnimatePresence> */}
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-white transition-colors group overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ scale: 1 }}
                />
                
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <item.icon className="w-4 h-4" />
                </motion.div>
                <span className="relative z-10 font-medium">{item.label}</span>
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Enhanced Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications with pulse */}
            <motion.button
              className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 0 4px rgba(59, 130, 246, 0.1)',
                  '0 0 0 0 rgba(59, 130, 246, 0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell className="w-5 h-5" />
              <motion.span 
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Ripple effect */}
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full opacity-75"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Enhanced Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white transition-all duration-300 overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 360 }}
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.2, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Enhanced Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-b-2xl"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-6 py-4 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-xl mx-2"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}