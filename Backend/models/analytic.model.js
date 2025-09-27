import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const analyticSchema = new Schema(
  {
    postId: { type: Types.ObjectId, ref: "Post", required: true },

    // Detailed view logs
    views: [
      {
        userId: { type: Types.ObjectId, ref: "User", default: null }, // null = guest
        timestamp: { type: Date, default: Date.now },
        ipAddress: String,
      },
    ],

    // Aggregated daily views: { "YYYY-MM-DD": count }
    dailyViews: {
      type: Map,
      of: Number,
      default: {},
    },

    // Views by country: { "CountryName": count }
    topCountries: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const Analytic = model("Analytic", analyticSchema);
