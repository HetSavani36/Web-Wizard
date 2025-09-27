'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  TrendingUp,
  Clock,
  Heart,
  Filter,
  Search,
  Star,
  Eye,
  MessageCircle,
  Globe,
  BookOpen,
  User,
  Award,
  Rocket,
  Palette,
  Code,
  Coffee,
  Lightbulb,
  Target
} from 'lucide-react';

// Import existing components
// import Header from '@/components/common/Header';
// import Footer from '@/components/common/Footer';

const dummyPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we build websites and applications.",
    author: "Sarah Johnson",
    publishedAt: "2024-01-15",
    views: 15420,
    upvotes: 892,
    comments: 47,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    readTime: "8 min"
  },
  {
    id: 2,
    title: "Mastering React : Advanced Patterns",
    excerpt: "Deep dive into advanced React hooks patterns that will level up your development skills.",
    author: "Mike Chen",
    publishedAt: "2024-01-12",
    views: 8930,
    upvotes: 456,
    comments: 23,
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    readTime: "12 min"
  },
  {
    id: 3,
    title: "Design Systems That Scale",
    excerpt: "Building comprehensive design systems for growing teams and evolving products.",
    author: "Emma Wilson",
    publishedAt: "2024-01-10",
    views: 12650,
    upvotes: 721,
    comments: 35,
    category: "Design",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    readTime: "10 min"
  },
  {
    id: 4,
    title: "Next.js 14: What's New and Exciting",
    excerpt: "Comprehensive overview of the latest Next.js features and performance improvements.",
    author: "Alex Rivera",
    publishedAt: "2024-01-08",
    views: 18750,
    upvotes: 1205,
    comments: 68,
    category: "Next.js",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    readTime: "15 min"
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "A practical guide to choosing between CSS Grid and Flexbox for different layout scenarios.",
    author: "David Park",
    publishedAt: "2024-01-05",
    views: 9340,
    upvotes: 387,
    comments: 19,
    category: "CSS",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    readTime: "7 min"
  },
  {
    id: 6,
    title: "Building Accessible Web Applications",
    excerpt: "Essential practices for creating inclusive web experiences that work for everyone.",
    author: "Lisa Chen",
    publishedAt: "2024-01-03",
    views: 6780,
    upvotes: 234,
    comments: 12,
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop",
    readTime: "11 min"
  }
];

const categories = [
  { name: 'Technology', icon: Rocket, color: 'from-blue-500 to-cyan-500', count: 45 },
  { name: 'Design', icon: Palette, color: 'from-purple-500 to-pink-500', count: 32 },
  { name: 'Development', icon: Code, color: 'from-green-500 to-teal-500', count: 67 },
  { name: 'Lifestyle', icon: Coffee, color: 'from-orange-500 to-red-500', count: 23 },
  { name: 'Innovation', icon: Lightbulb, color: 'from-yellow-500 to-orange-500', count: 18 },
  { name: 'Business', icon: Target, color: 'from-indigo-500 to-purple-500', count: 29 }
];

const BlogCard = ({ post, index }) => {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
          {post.category}
        </div>

        {/* Reading time */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
          {post.readTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author and date */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {post.author.charAt(0)}
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>

        {/* Stats and actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">{post.upvotes}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{post.views.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors cursor-pointer">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{post.comments}</span>
            </div>
          </div>

          <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium transition-colors group">
            Read More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default function BlogeshMainPage() {
  const [posts] = useState(dummyPosts);
  const [filteredPosts, setFilteredPosts] = useState(dummyPosts);
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
      post.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    let sorted = [...filteredPosts];
    
    switch (sortOption) {
      case 'popular':
        sorted.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'views':
        sorted.sort((a, b) => b.views - a.views);
        break;
      case 'latest':
      default:
        sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }
    
    setFilteredPosts(sorted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            Loading stories...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Import your existing Header component here */}
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Stories That
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Inspire
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover cutting-edge technology insights, innovative development practices, 
              and creative solutions from our global community.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for amazing stories..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                className={`px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105`}
              >
                <div className="flex items-center gap-2 text-white">
                  <category.icon className="w-4 h-4" />
                  <span className="font-semibold">{category.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {[
              { number: '50K+', label: 'Active Readers', icon: Globe },
              { number: '1.2K+', label: 'Published Stories', icon: BookOpen },
              { number: '200+', label: 'Expert Writers', icon: User },
              { number: '95%', label: 'Satisfaction Rate', icon: Award }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.number}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Sort by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'latest', label: 'Latest', icon: Clock },
                { key: 'popular', label: 'Popular', icon: TrendingUp },
                { key: 'views', label: 'Most Viewed', icon: Eye }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    sortBy === key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <main className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Featured Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handpicked content from our most talented writers and industry experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard post={post} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              Load More Stories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </main>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Never Miss a Story
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to get the latest insights delivered straight to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white font-semibold hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Import your existing Footer component here */}
      {/* <Footer /> */}
    </div>
  );
}