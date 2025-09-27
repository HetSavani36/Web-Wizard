import { Router } from "express";
import {
  getAllComments,
  addComment,
  editComment,
  deleteComment,
  upVoteComment,
  downVoteComment,
} from "../controllers/comment.controller.js"; // Make sure these are exported
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Get all comments for a post & add a comment
router
  .route("/:postId")
  .get(getAllComments) // Public: fetch all comments of a post
  .post(verifyJWT, addComment); // Authenticated: add comment

// Edit/Delete a comment (use commentId in body or query)
router.patch("/:commentId", verifyJWT, editComment);
router.delete("/:commentId", verifyJWT, deleteComment);

// Upvote / Downvote a comment
router.patch("/:commentId/upVote", verifyJWT, upVoteComment);
router.patch("/:commentId/downVote", verifyJWT, downVoteComment);

export default router;
