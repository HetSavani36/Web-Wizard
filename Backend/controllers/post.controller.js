import Post from "../models/post.model.js"; // Make sure you have a Post model
import asyncHandler from "express-async-handler";

// @desc    Create a new post (Admin only)
// @route   POST /posts
// @access  Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Title, content, and category are required");
  }

  const post = await Post.create({
    title,
    content,
    category,
    author: req.user.id,
    views: 0,
    likes: [],
  });

  res.status(201).json({ success: true, data: post });
});

// @desc    Get all posts with optional filters
// @route   GET /posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const posts = await Post.find(query)
    .populate("author", "name") // optional
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: posts });
});

// @desc    Get single post by ID
// @route   GET /posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name");

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json({ success: true, data: post });
});

// @desc    Update a post (Admin only)
// @route   PATCH /posts/:id
// @access  Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const { title, content, category } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;
  if (category) post.category = category;

  await post.save();
  res.status(200).json({ success: true, data: post });
});

// @desc    Delete a post (Admin only)
// @route   DELETE /posts/:id
// @access  Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  await post.remove();
  res.status(200).json({ success: true, message: "Post deleted successfully" });
});

// @desc    Get trending posts (based on views or likes)
// @route   GET /posts/trending
// @access  Public
const getTrendingPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ views: -1 }) // can also use likes.length for popularity
    .limit(10)
    .populate("author", "name");

  res.status(200).json({ success: true, data: posts });
});

// @desc    Increment view count for a post
// @route   PATCH /posts/:id/views
// @access  Public
const incrementViewCount = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  post.views += 1;
  await post.save();

  res.status(200).json({ success: true, data: { views: post.views } });
});

export {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getTrendingPosts,
  incrementViewCount,
};
