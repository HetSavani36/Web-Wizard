import Bookmark from "../models/bookmark.model.js"; // Make sure you have a Bookmark model
import Post from "../models/post.model.js";
import asyncHandler from "express-async-handler";

// @desc    Add a bookmark to a post
// @route   POST /bookmarks/:postId
// @access  Authenticated
const addBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  // Prevent duplicate bookmark
  const existing = await Bookmark.findOne({ user: req.user.id, post: postId });
  if (existing) {
    res.status(400);
    throw new Error("Post already bookmarked");
  }

  const bookmark = await Bookmark.create({
    user: req.user.id,
    post: postId,
  });

  res.status(201).json({ success: true, data: bookmark });
});

// @desc    Remove a bookmark from a post
// @route   DELETE /bookmarks/:postId
// @access  Authenticated
const removeBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const bookmark = await Bookmark.findOne({ user: req.user.id, post: postId });
  if (!bookmark) {
    res.status(404);
    throw new Error("Bookmark not found");
  }

  await bookmark.remove();
  res
    .status(200)
    .json({ success: true, message: "Bookmark removed successfully" });
});

// @desc    Get all bookmarks of a user
// @route   GET /bookmarks/user/:userId
// @access  Authenticated
const getUserBookmarks = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Users can only view their own bookmarks
  if (req.user.id !== userId) {
    res.status(403);
    throw new Error("You can only view your own bookmarks");
  }

  const bookmarks = await Bookmark.find({ user: userId }).populate("post");
  res.status(200).json({ success: true, data: bookmarks });
});

// @desc    Like a post
// @route   PATCH /bookmarks/:postId/like
// @access  Authenticated
const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
  }

  await post.save();
  res.status(200).json({ success: true, data: post });
});

// @desc    Unlike a post
// @route   PATCH /bookmarks/:postId/unlike
// @access  Authenticated
const unlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
  await post.save();

  res.status(200).json({ success: true, data: post });
});

export { addBookmark, removeBookmark, getUserBookmarks, likePost, unlikePost };
