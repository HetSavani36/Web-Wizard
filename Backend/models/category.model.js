import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // e.g., "AI", "Web Development"
    description: { type: String, default: "" },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);


export const Category = model("Category", categorySchema);