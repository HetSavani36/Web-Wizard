import { Router } from "express";
import {
  getTrendingAnalytics,
  getLeaderboard,
  updateUserPoints,
  getUserDashboardAnalytics,
  getAdminDashboardAnalytics,
  getUserManagementAnalytics,
} from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.get("/trending", verifyJWT, getTrendingAnalytics);

router.get("/leaderboard", verifyJWT, getLeaderboard);

router.patch("/users/:userId/points", verifyJWT, isAdmin, updateUserPoints);

router.get("/user", verifyJWT, getUserDashboardAnalytics);
router.get("/admin", verifyJWT, isAdmin, getAdminDashboardAnalytics);

router.get("/user/management", verifyJWT, isAdmin, getUserManagementAnalytics);

export default router;
