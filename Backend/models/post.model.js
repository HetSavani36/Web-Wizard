import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const postSchema = new Schema({
  _id: ObjectId,
  title: String,
  content: String, // Blog text
  coverImage: String, // Optional thumbnail URL
  author: { type: ObjectId, ref: "User" }, // Admin who created it
  category: { type: ObjectId, ref: "Category" },
  tags: [String], // e.g. ["AI", "ML", "Deep Learning"]
  isDraft: { type: Boolean, default: false },
  scheduledAt: Date, // For future publishing
  publishedAt: Date,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 }, // Count only
  aiSummary: String, // Pre-generated AI TL;DR
  createdAt: Date,
  updatedAt: Date,
});

export const Post = mongoose.model("Post", postSchema);
