"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlogList from "@/components/blog/BlogList";
import SearchBar from "@/components/common/SearchBar";
import { dummyPosts } from "@/lib/dummyData";
import {   ArrowRight,
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
  Target  } from "lucide-react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(dummyPosts);
      setFilteredPosts(dummyPosts);
      setLoading(false);
    }, 1000);
  }, []);
  const categories = [
    {
      name: "Technology",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      count: 45,
    },
    {
      name: "Design",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      count: 32,
    },
    {
      name: "Development",
      icon: Code,
      color: "from-green-500 to-teal-500",
      count: 67,
    },
    {
      name: "Lifestyle",
      icon: Coffee,
      color: "from-orange-500 to-red-500",
      count: 23,
    },
    {
      name: "Innovation",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      count: 18,
    },
    {
      name: "Business",
      icon: Target,
      color: "from-indigo-500 to-purple-500",
      count: 29,
    },
  ];
  const handleSearch = (searchTerm) => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    let sorted = [...filteredPosts];

    switch (sortOption) {
      case "popular":
        sorted.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "views":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "latest":
      default:
        sorted.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
    }

    setFilteredPosts(sorted);
  };

  if (loading) {
    return (
      <div className="space-y-6  ">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4"
              >
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
      className="space-y-8 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br p-0 from-blue-600 via-purple-600 to-pink-600 text-white">
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
              Discover cutting-edge technology insights, innovative development
              practices, and creative solutions from our global community.
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
              { number: "50K+", label: "Active Readers", icon: Globe },
              { number: "1.2K+", label: "Published Stories", icon: BookOpen },
              { number: "200+", label: "Expert Writers", icon: User },
              { number: "95%", label: "Satisfaction Rate", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                </h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter and Sort Controls */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Sort by:</span>
        </div>
        <div className="flex gap-2">
          {[
            { key: "latest", label: "Latest", icon: Clock },
            { key: "popular", label: "Popular", icon: TrendingUp },
            { key: "views", label: "Most Viewed", icon: Heart },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleSort(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                sortBy === key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Posts */}
      <BlogList posts={filteredPosts} />
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
    </motion.div>
  );
}
