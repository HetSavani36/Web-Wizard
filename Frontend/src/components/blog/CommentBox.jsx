'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Reply, Flag, ChevronDown, ChevronUp } from 'lucide-react';

function CommentItem({ comment, level = 0 }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      // In a real app, this would add to the replies array
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.div 
      className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-3 mb-4">
        {/* <Image
          src={comment.avatar}
          alt={comment.author}
          width={40}
          height={40}
          className="rounded-full flex-shrink-0"
        /> */}
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white">
              {comment.author}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {timeAgo(comment.publishedAt)}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            {comment.content}
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                isLiked 
                  ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
              {likes}
            </motion.button>

            <motion.button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Reply className="w-4 h-4" />
              Reply
            </motion.button>

            <motion.button
              className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Flag className="w-4 h-4" />
              Report
            </motion.button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <motion.form 
              onSubmit={handleReply}
              className="mt-3 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author}...`}
                rows={3}
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reply
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {isExpanded && comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
          
          {comment.replies.length > 0 && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 ml-12"
              whileHover={{ scale: 1.05 }}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {isExpanded ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function CommentBox({ comments }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      
      {comments.length === 0 && (
        <motion.div 
          className="text-center py-12 text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" /> */}
          <p>No comments yet. Be the first to share your thoughts!</p>
        </motion.div>
      )}
    </div>
  );
}
