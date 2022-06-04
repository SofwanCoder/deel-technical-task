import express from "express";
import requirePermission from "../middlewares/permission";
import JobHandler from "../handlers/JobHandler";

const router = express.Router();

router.get(
  "/unpaid",
  requirePermission(),
  JobHandler.handleGetUnpaidJobs
)

router.post(
  "/:jobId/pay",
  requirePermission(),
  JobHandler.handlePayJob
);

export default router;
