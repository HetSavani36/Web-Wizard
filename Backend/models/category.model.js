import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const categorySchema = new Schema({
  _id: ObjectId,
  name: { type: String, unique: true }, // "AI", "Web Development", "Databases"
  description: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Category = mongoose.model("Category", categorySchema);
