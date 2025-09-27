import { Router } from "express";
import {
  summarizePost,
  moderateComment,
  getRecommendations,
  summarizePost,
} from "../controllers/aiIntegration.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// AI Summarization for a post
router.get("/summarize/:postId", summarizePost);

// AI moderation for a comment
router.post("/moderate-comment", verifyJWT, moderateComment);

// Personalized recommendations
router.get("/recommendations", verifyJWT, getRecommendations);

// Translate a post to a selected language
router.get("/translate/:postId", summarizePost); // could pass lang via query: ?lang=fr

export default router;
