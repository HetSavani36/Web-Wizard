import { Router } from "express";
import {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
  likePost,
  unlikePost,
} from "../controllers/bookmark.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Bookmark / Unbookmark a post
router.post("/:postId", verifyJWT, addBookmark);
router.delete("/:postId", verifyJWT, removeBookmark);

// Get all bookmarks of a user
router.get("/user/:userId", verifyJWT, getUserBookmarks);

// Like / Unlike a post
router.patch("/:postId/like", verifyJWT, likePost);
router.patch("/:postId/unlike", verifyJWT, unlikePost);

export default router;
