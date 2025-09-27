import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const analyticSchema = new Schema(
 {
  _id: ObjectId,
  postId: { type: ObjectId, ref: "Post" },
  views: [
    {
      userId: { type: ObjectId, ref: "User", default: null }, // null = guest
      timestamp: Date,
      ipAddress: String
    }
  ],
  dailyViews: { "2025-09-27": 100, "2025-09-28": 87 },  // Aggregated data
  topCountries: { "India": 50, "USA": 20 }
}

);



export const User = mongoose.model("Analytic", analyticSchema);
