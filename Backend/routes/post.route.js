import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getTrendingPosts,
  incrementViewCount,
  upVote,
  downVote,
  createDraft,
  postDraft
} from "../controllers/post.controller.js"; // Make sure these are exported
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, isAdmin, createPost) // Admin only
  .get(getAllPosts); // Public

router
  .route("/:id")
  .get(getPost) // Public
  .patch(verifyJWT, isAdmin, updatePost) // Admin only
  .delete(verifyJWT, isAdmin, deletePost); // Admin only

// Increment post views
router.patch("/:id/views", incrementViewCount);

router.patch("/:id/upVote",verifyJWT, upVote);
router.patch("/:id/downVote",verifyJWT ,downVote);

router.route("/draft")
.post(verifyJWT, isAdmin, createDraft)


router.route("/:id/draft").patch(verifyJWT, isAdmin, postDraft);

export default router;