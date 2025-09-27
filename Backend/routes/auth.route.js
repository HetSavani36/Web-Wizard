import { Router } from "express";
import {
  authenticateController,
  callbackController,
  refreshController,
  logout,
  meController,
  userRegisterUsingEmail,
  loginUsingEmail,
  adminRegisterUsingEmail
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//google
router.get("/google", authenticateController);
router.get("/google/callback", callbackController);
router.post("/refresh-token", refreshController);
router.post("/logout", logout);
router.get("/me", verifyJWT, meController);

//email
router.post("/register",userRegisterUsingEmail)
router.post("/login",loginUsingEmail)
router.post("/admin/register",adminRegisterUsingEmail)




export default router;