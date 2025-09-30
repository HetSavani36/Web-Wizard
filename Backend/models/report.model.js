import mongoose, { Schema, Types } from "mongoose";

const reportSchema = new Schema(
  {
    postId: { type: Types.ObjectId, ref: "Post", required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required:true },
    severity:{type:String,enum:["High","Medium","Low"],default:"Medium"},
    status:{type:String,enum:["Pending","Resolved","Dismissed"],default:"Pending"},
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
