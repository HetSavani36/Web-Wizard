import mongoose, { Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    coverImage: { type: String }, 
    author: { type: Types.ObjectId, ref: "User", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    tags: [String], 
    isDraft: { type: Boolean, default: false },
    scheduledAt: { type: Date }, 
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    upVotes: [{ type: Types.ObjectId, ref: "User" }], 
    downVotes: [{ type: Types.ObjectId, ref: "User" }], 
    bookmarks: [{ type: Types.ObjectId, ref: "User" }], 
    aiSummary: { type: String },
  },
  { timestamps: true } 
);

export const Post = mongoose.model("Post", postSchema);
