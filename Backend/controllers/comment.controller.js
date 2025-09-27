import mongoose from "mongoose";
import {Comment} from "../models/comment.model.js"; // Make sure you have a Comment model
import {Post} from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    postId: new mongoose.Types.ObjectId(req.params.postId),
  })
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: comments });
});

const addComment = asyncHandler(async (req, res) => {
  const { content, parentCommentId } = req.body;
  const { postId } = req.params;

  if (!content || content.trim() === "") {
    res.status(400);
    throw new Error("Comment cannot be empty");
  }

  // Prevent duplicate comment from same user on same post
  const existing = await Comment.findOne({
    postId: new mongoose.Types.ObjectId(postId),
    userId: new mongoose.Types.ObjectId(req.user._id),
    content,
  });
  if (existing) {
    res.status(400);
    throw new Error("Duplicate comment");
  }

  const comment = await Comment.create({
    postId: new mongoose.Types.ObjectId(postId),
    userId: new mongoose.Types.ObjectId(req.user._id),
    parentCommentId: parentCommentId || null,
    content,
  });

  const user=await User.findById(req.user._id)
  user.points+=80
  await user.save()

  res.status(201).json({ success: true, data: comment });
});



const editComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Only author can edit
  if (comment.userId.toString() !== req.user._id) {
    res.status(403);
    throw new Error("You can only edit your own comments");
  }

  if (content && content.trim() !== "") comment.content = content;

  await comment.save();
  res.status(200).json({ success: true, data: comment });
});


const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Only author can delete
  if (comment.userId.toString() !== req.user._id) {
    res.status(403);
    throw new Error("You can only delete your own comments");
  }
  await comment.deleteOne();
  
  const user=await User.findById(req.user._id)
  user.points-=80
  await user.save()

  res
    .status(200)
    .json({ success: true, message: "Comment deleted successfully" });
});


const upVoteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (!comment.upvotes.includes(req.user._id)) {
    comment.upvotes.push(req.user._id);
    // Remove from downvotes if exists
    
    const prevLength = comment.downvotes.length;
    comment.downvotes = comment.downvotes.filter(
      (id) => id.toString() !== req.user._id
    );
    const length=comment.downvotes.length

    const user=await User.findById(req.user._id)
    if(prevLength==length) user.points+=20
    else user.points-=10

    await user.save()
  }

  await comment.save();
  res.status(200).json({ success: true, data: comment });
});


const downVoteComment = asyncHandler(async (req, res) => {    
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (!comment.downvotes.includes(req.user._id)) {
    comment.downvotes.push(req.user._id);

    const prevLength = comment.upvotes.length;
    // Remove from upvotes if exists
    comment.upvotes = comment.upvotes.filter(
      (id) => id.toString() !== req.user._id
    );
    const length = comment.upvotes.length;

    const user = await User.findById(req.user._id);
    if (prevLength == length) user.points += 10;
    else user.points -= 10;

    await user.save();
  }

  await comment.save();
  res.status(200).json({ success: true, data: comment });
});


const getFlaggedComments = asyncHandler(async (req, res) => {
  const flaggedComments = await Comment.find({ flagged: true })
    .populate("userId", "name email")
    .populate("postId", "title")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: flaggedComments });
});


const flagComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  comment.flagged = true;
  await comment.save();

  res.status(200).json({ success: true, message: "Comment flagged successfully" });
});


const unflagComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  comment.flagged = false;
  await comment.save();

  res.status(200).json({ success: true, message: "Comment unflagged successfully" });
});


const deleteFlaggedComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  await comment.deleteOne();
  res.status(200).json({ success: true, message: "Flagged comment deleted successfully" });
});


export {
  getAllComments,
  addComment,
  editComment,
  deleteComment,
  upVoteComment,
  downVoteComment,
  getFlaggedComments,
  flagComment,
  unflagComment,
  deleteFlaggedComment,
};
