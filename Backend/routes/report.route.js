import { Router } from "express";
import {
  postReport,
  getReport,
  getAllReports,
  updateReportStatus,
} from "../controllers/report.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get("/",isAdmin,getAllReports)
router
  .route("/:id")
  .post(postReport) //postId
  .get(isAdmin, getReport) //reportId
  .patch(isAdmin,updateReportStatus) //reportId

export default router;
