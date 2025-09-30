import { Router } from "express"
import {
  moderateComment,
  translatePost,
} from "../controllers/aiIntegration.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/moderate-comment", verifyJWT, moderateComment)
router.get("/translate/:postId", translatePost)

export default router