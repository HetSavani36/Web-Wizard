import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const categorieSchema = new Schema(
 {
  _id: ObjectId,
  name: { type: String, unique: true },   // "AI", "Web Development", "Databases"
  description: String,
  createdAt: Date,
  updatedAt: Date
}
);



export const User = mongoose.model("Categorie", categorieSchema);
