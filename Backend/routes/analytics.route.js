import { Router } from "express";
import {
  getPostAnalytics,
  getTrendingAnalytics,
  getLeaderboard,
  updateUserPoints,
} from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

// Post analytics (views, likes, comments)
router.get("/posts/:postId", verifyJWT, getPostAnalytics);

// System-wide trending analytics
router.get("/trending", verifyJWT, getTrendingAnalytics);

// Leaderboard for gamification
router.get("/leaderboard", verifyJWT, getLeaderboard);

// Update user points (admin or system triggers)
router.patch("/users/:userId/points", verifyJWT, isAdmin, updateUserPoints);

export default router;
