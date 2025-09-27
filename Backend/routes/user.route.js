import { Router } from "express";
import {
  getAllUsers,
  getUserDetails,
  updateProfile,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

// Get all users (Admin only)
router.get("/", isAdmin, getAllUsers);

// Operations on a single user
router
  .route("/:id")
  .get(isAdmin, getUserDetails) // Admin only: get any user's details
  .patch(updateProfile) // Authenticated user: update own profile
  .delete(isAdmin, deleteUser); // Admin only: delete a user

export default router;
