import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const commentSchema = new Schema({
  _id: ObjectId,
  postId: { type: ObjectId, ref: "Post" },
  userId: { type: ObjectId, ref: "User" },
  parentCommentId: { type: ObjectId, ref: "Comment", default: null }, // For threaded replies
  content: String,
  likes: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false }, // AI/Users can flag spam
  createdAt: Date,
  updatedAt: Date,
});

export const Comment = mongoose.model("Comment", commentSchema);
