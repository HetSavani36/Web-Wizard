import mongoose, { Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // Blog text
    coverImage: { type: String }, // Optional thumbnail URL
    author: { type: Types.ObjectId, ref: "User", required: true }, // Admin who created it
    category: { type: Types.ObjectId, ref: "Category", required: true },
    tags: [String], // e.g. ["AI", "ML", "Deep Learning"]
    isDraft: { type: Boolean, default: false },
    scheduledAt: { type: Date }, // For future publishing
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    upVotes: [{ type: Types.ObjectId, ref: "User" }], // Array of user IDs
    downVotes: [{ type: Types.ObjectId, ref: "User" }], // Array of user IDs
    bookmarks: [{ type: Types.ObjectId, ref: "User" }], // Array of user IDs
    aiSummary: { type: String }, // Pre-generated AI TL;DR
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export const Post = mongoose.model("Post", postSchema);
