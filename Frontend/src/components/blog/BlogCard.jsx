'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  Clock, 
  Bookmark, 
  Share2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function BlogCard({ post }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [userVote, setUserVote] = useState(null);

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleVote = (type) => {
    if (userVote === type) {
      // Remove vote
      if (type === 'up') setUpvotes(upvotes - 1);
      else setDownvotes(downvotes - 1);
      setUserVote(null);
    } else {
      // Add new vote or change vote
      if (userVote === 'up') setUpvotes(upvotes - 1);
      if (userVote === 'down') setDownvotes(downvotes - 1);
      
      if (type === 'up') setUpvotes(upvotes + (userVote === 'down' ? 2 : 1));
      else setDownvotes(downvotes + (userVote === 'up' ? 2 : 1));
      
      setUserVote(type);
    }
  };

  return (
    <motion.article
  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
  whileHover={{
    y: -10,
    scale: 1.03,
    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
  }}
  transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
>
  <Link href={`/blog/${post.id}`}>
    <div className="relative h-52 overflow-hidden">
      <Image
        src={post.coverImage}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />``
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${
            post.category === 'Technology'
              ? 'from-blue-400 to-blue-600'
              : post.category === 'Web Development'
              ? 'from-green-400 to-green-600'
              : post.category === 'AI'
              ? 'from-purple-400 to-purple-600'
              : 'from-gray-400 to-gray-600'
          }`}
        >
          {post.category}
        </span>
      </div>
    </div>
  </Link>

  <div className="p-6">
    <Link href={`/blog/${post.id}`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
        {post.title}
      </h3>
    </Link>
    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
      {post.summary}
    </p>

    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Heart className="w-4 h-4" />
          {post.upvotes}
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          {/* <TrendingUp className="w-4 h-4" /> */}
          {post.views}
        </div>
      </div>

      <motion.button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-all shadow-md hover:shadow-blue-400/50"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bookmark className="w-4 h-4" />
      </motion.button>
    </div>
  </div>
</motion.article>

  );
}

