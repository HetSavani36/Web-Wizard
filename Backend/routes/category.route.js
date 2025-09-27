import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js"; // make sure all functions are exported
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

// Route for creating a category (admin) & getting all categories (public)
router
  .route("/")
  .post(verifyJWT, isAdmin, createCategory) // Admin only
  .get(getAllCategories); // Public

// Route for a single category: get details, update, delete
router
  .route("/:id")
  .get(getCategoryDetails) // Public
  .patch(verifyJWT, isAdmin, updateCategory) // Admin only
  .delete(verifyJWT, isAdmin, deleteCategory); // Admin only

export default router;
