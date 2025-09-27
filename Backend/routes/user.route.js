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

router.use(verifyJWT);

router.get("/", isAdmin, getAllUsers);

router
  .route("/:id")
  .get(isAdmin, getUserDetails) 
  .patch(updateProfile) 
  .delete(isAdmin, deleteUser);

export default router;
