import { Router } from "express"
import {
  summarizePost,
  moderateComment,
  getRecommendations,
  translatePost,
} from "../controllers/aiIntegration.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/summarize/:postId", summarizePost)
router.post("/moderate-comment", verifyJWT, moderateComment)
router.get("/recommendations", verifyJWT, getRecommendations)
router.get("/translate/:postId", translatePost)

export default router