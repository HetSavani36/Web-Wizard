import mongoose, { Schema, Types } from "mongoose";

const subscribeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    categories:[
        {type:String}
    ]
  },
  { timestamps: true }
);

export const Subscribe = mongoose.model("Subscribe", subscribeSchema);
