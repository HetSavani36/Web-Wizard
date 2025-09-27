import {Comment} from "../models/comment.model.js"; // Make sure you have a Comment model
import {Post} from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Get all comments for a post
// @route   GET /comments/:postId
// @access  Public
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("author", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: comments });
});

// @desc    Add a comment to a post
// @route   POST /comments/:postId
// @access  Authenticated
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  if (!content || content.trim() === "") {
    res.status(400);
    throw new Error("Comment cannot be empty");
  }

  // Prevent duplicate comment from same user on same post
  const existing = await Comment.findOne({
    post: postId,
    author: req.user.id,
    content,
  });
  if (existing) {
    res.status(400);
    throw new Error("Duplicate comment");
  }

  const comment = await Comment.create({
    content,
    author: req.user.id,
    post: postId,
  });

  res.status(201).json({ success: true, data: comment });
});

// @desc    Edit a comment
// @route   PATCH /comments/:commentId
// @access  Authenticated
const editComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Only author can edit
  if (comment.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You can only edit your own comments");
  }

  if (content && content.trim() !== "") comment.content = content;

  await comment.save();
  res.status(200).json({ success: true, data: comment });
});

// @desc    Delete a comment
// @route   DELETE /comments/:commentId
// @access  Authenticated
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Only author can delete
  if (comment.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You can only delete your own comments");
  }

  await comment.remove();
  res
    .status(200)
    .json({ success: true, message: "Comment deleted successfully" });
});

// @desc    Upvote a comment
// @route   PATCH /comments/:commentId/upVote
// @access  Authenticated
const upVoteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (!comment.upvotes.includes(req.user.id)) {
    comment.upvotes.push(req.user.id);
    // Remove from downvotes if exists
    comment.downvotes = comment.downvotes.filter(
      (id) => id.toString() !== req.user.id
    );
  }

  await comment.save();
  res.status(200).json({ success: true, data: comment });
});

// @desc    Downvote a comment
// @route   PATCH /comments/:commentId/downVote
// @access  Authenticated
const downVoteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (!comment.downvotes.includes(req.user.id)) {
    comment.downvotes.push(req.user.id);
    // Remove from upvotes if exists
    comment.upvotes = comment.upvotes.filter(
      (id) => id.toString() !== req.user.id
    );
  }

  await comment.save();
  res.status(200).json({ success: true, data: comment });
});

export {
  getAllComments,
  addComment,
  editComment,
  deleteComment,
  upVoteComment,
  downVoteComment,
};
