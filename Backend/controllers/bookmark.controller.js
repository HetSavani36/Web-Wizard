import mongoose from "mongoose";
import {Bookmark} from "../models/bookmark.model.js"; // Make sure you have a Bookmark model
import {Post} from "../models/post.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addBookmark = asyncHandler(async (req, res) => {
  const { postId } = new mongoose.Types.ObjectId(req.params);
  const post=await Post.findById(postId)
  if(!post) throw new ApiError(404,"post not found")
  const userId = new mongoose.Types.ObjectId(req.user._id);

  // Prevent duplicate bookmark
  const existing = await Bookmark.findOne({ user: userId, post: postId });
  if (existing) {
    res.status(400);
    throw new Error("Post already bookmarked");
  }

  const bookmark = await Bookmark.create({
    userId: userId,
    postId: postId,
  });

  res.status(201).json({ success: true, data: bookmark });
});



const removeBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) throw new ApiError(404, "post not found");
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const bookmark = await Bookmark.findOne({ user: userId, post: postId });
  if (!bookmark) {
    res.status(404);
    throw new Error("Bookmark not found");
  }

  await bookmark.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Bookmark removed successfully" });
});



const getUserBookmarks = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);

  // Users can only view their own bookmarks
  if (req.user._id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("You can only view your own bookmarks");
  }

  const bookmarks = await Bookmark.find({ userId: userId }).populate("postId");
  res.status(200).json({ success: true, data: bookmarks });
});


export { addBookmark, removeBookmark, getUserBookmarks };
