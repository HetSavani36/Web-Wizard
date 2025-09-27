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

router.get("/posts/:postId", verifyJWT, getPostAnalytics);

router.get("/trending", verifyJWT, getTrendingAnalytics);

router.get("/leaderboard", verifyJWT, getLeaderboard);

router.patch("/users/:userId/points", verifyJWT, isAdmin, updateUserPoints);

export default router;
