import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const bookmarkSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    postId: { type: Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true } 
);

bookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const Bookmark = model("Bookmark", bookmarkSchema);
