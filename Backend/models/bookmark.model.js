import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const bookmarkSchema = new Schema({
  _id: ObjectId,
  userId: { type: ObjectId, ref: "User" },
  postId: { type: ObjectId, ref: "Post" },
  createdAt: Date,
});

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);