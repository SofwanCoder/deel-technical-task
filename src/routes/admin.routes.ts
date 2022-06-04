import express, { Router } from "express";
import AdminHandler from "../handlers/AdminHandler";

const router = express.Router();

router.get(
  "/best-profession",
  AdminHandler.handleGetBestProfession
);

router.get(
  "/best-clients",
  AdminHandler.handleGetBestClient
);

export default router;
