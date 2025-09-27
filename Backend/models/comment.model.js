import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const commentSchema = new Schema(
  {
    postId: { type: Types.ObjectId, ref: "Post", required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    parentCommentId: { type: Types.ObjectId, ref: "Comment", default: null }, // For threaded replies
    content: { type: String, required: true, trim: true },
    upvotes: [{ type: Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Types.ObjectId, ref: "User" }],
    flagged: { type: Boolean, default: false }, // AI/Users can flag spam
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Optional: index for faster queries by postId
commentSchema.index({ postId: 1, parentCommentId: 1 });

export const Comment = model("Comment", commentSchema);
