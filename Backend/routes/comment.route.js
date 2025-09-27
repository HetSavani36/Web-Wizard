import { Router } from "express";
import {
  getAllComments,
  addComment,
  editComment,
  deleteComment,
  upVoteComment,
  downVoteComment,
  getFlaggedComments,
  flagComment,
  unflagComment,
  deleteFlaggedComment,
} from "../controllers/comment.controller.js"; // Make sure these are exported
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();


router
  .route("/:postId")
  .get(getAllComments) 
  .post(verifyJWT, addComment); 

router.patch("/:commentId", verifyJWT, editComment);
router.delete("/:commentId", verifyJWT, deleteComment);

router.patch("/:commentId/upVote", verifyJWT, upVoteComment);
router.patch("/:commentId/downVote", verifyJWT, downVoteComment);

router.get("/flagged-comments",verifyJWT, isAdmin, getFlaggedComments);

router.patch("/flag-comment/:commentId",verifyJWT, flagComment);

router.patch("/unflag-comment/:commentId", verifyJWT,isAdmin, unflagComment);

router.delete("/flagged-comment/:commentId", verifyJWT,isAdmin, deleteFlaggedComment);


export default router;
