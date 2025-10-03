import { Router } from "express";
import {
  subscribe,
  getAllsubscriber,
} from "../controllers/subscribe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .post(subscribe)
  .get(isAdmin,getAllsubscriber)

export default router;