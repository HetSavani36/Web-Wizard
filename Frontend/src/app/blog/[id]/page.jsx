'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Send,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { dummyPosts } from '@/lib/dummyData';
import CommentBox from '@/components/blog/CommentBox';

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // NEW STATES FOR AI SUMMARY
  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchPost = async () => {
      const foundPost = dummyPosts.find(p => p.id === parseInt(params.id));
      if (foundPost) {
        setPost(foundPost);
        setUpvotes(foundPost.upvotes);
        setDownvotes(foundPost.downvotes);
        setComments(foundPost.comments || []);
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleVoiceRead = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(post.content.replace(/<[^>]*>/g, ''));
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleVote = (type) => {
    if (userVote === type) {
      if (type === 'up') setUpvotes(upvotes - 1);
      else setDownvotes(downvotes - 1);
      setUserVote(null);
    } else {
      if (userVote === 'up') setUpvotes(upvotes - 1);
      if (userVote === 'down') setDownvotes(downvotes - 1);
      
      if (type === 'up') setUpvotes(upvotes + (userVote === 'down' ? 2 : 1));
      else setDownvotes(downvotes + (userVote === 'up' ? 2 : 1));
      
      setUserVote(type);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        content: newComment,
        likes: 0,
        publishedAt: new Date().toISOString(),
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  // NEW FUNCTION TO GENERATE AI SUMMARY
  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setShowSummary(true);
      setIsGenerating(false);
    }, 1500); // Simulate API call delay
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Post not found
        </h1>
        <Link href="/" className="text-blue-600 hover:text-blue-700">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to posts
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {post.title}
        </motion.h1>

        {/* AI Summary Section */}
        {!showSummary ? (
          <motion.div 
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>Generate AI Summary</>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              AI Summary (TL;DR)
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              {post.summary}
            </p>
          </motion.div>
        )}

        {/* Cover Image */}
        <motion.div 
          className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        {/* Post Meta */}
        <motion.div 
          className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views} views
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Post Content */}
      <motion.div 
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comments Section */}
      <motion.section 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={!newComment.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-4 h-4" />
              Post Comment
            </motion.button>
          </div>
        </form>

        {/* Comments List */}
        <CommentBox comments={comments} />
      </motion.section>
    </motion.article>
  );
}
  