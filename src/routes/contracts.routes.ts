import express from "express";
import ContractHandler from "../handlers/ContractHandler";
import requirePermission from "../middlewares/permission";

const router = express.Router();

router.use(requirePermission());

router.get(
  "/:contractId",
  [],
  ContractHandler.handleGetContract
);

router.get(
  "/",
  [],
  ContractHandler.handleGetContracts
);

export default router;
