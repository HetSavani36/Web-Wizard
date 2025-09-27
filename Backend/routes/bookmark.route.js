import { Router } from "express";
import {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
} from "../controllers/bookmark.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:postId", verifyJWT, addBookmark);
router.delete("/:postId", verifyJWT, removeBookmark);

router.get("/user/:userId", verifyJWT, getUserBookmarks);
export default router;
