import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

// @desc    Get analytics for a single post (views, likes, comments)
// @route   GET /analytics/posts/:postId
// @access  Authenticated
const getPostAnalytics = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)
    .populate("author", "name")
    .populate("comments"); // assume comments are populated

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const analytics = {
    views: post.views,
    likes: post.likes.length,
    comments: post.comments.length,
  };

  res.status(200).json({ success: true, data: analytics });
});

// @desc    Get system-wide trending posts (based on views, likes, comments)
// @route   GET /analytics/trending
// @access  Authenticated
const getTrendingAnalytics = asyncHandler(async (req, res) => {
  // Simple scoring formula: views + likes*2 + comments*3
  const posts = await Post.find().populate("comments");

  const trending = posts
    .map((post) => ({
      postId: post._id,
      title: post.title,
      score: post.views + post.likes.length * 2 + post.comments.length * 3,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // top 10 trending

  res.status(200).json({ success: true, data: trending });
});

// @desc    Get leaderboard for gamification (users with most points)
// @route   GET /analytics/leaderboard
// @access  Authenticated
const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .sort({ points: -1 })
    .limit(10)
    .select("name points");
  res.status(200).json({ success: true, data: users });
});

// @desc    Update user points (Admin only)
// @route   PATCH /analytics/users/:userId/points
// @access  Admin
const updateUserPoints = asyncHandler(async (req, res) => {
  const { points } = req.body;

  if (points === undefined) {
    res.status(400);
    throw new Error("Points value is required");
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.points = points;
  await user.save();

  res
    .status(200)
    .json({ success: true, data: { userId: user._id, points: user.points } });
});

export {
  getPostAnalytics,
  getTrendingAnalytics,
  getLeaderboard,
  updateUserPoints,
};
