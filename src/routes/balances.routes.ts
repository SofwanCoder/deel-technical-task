import express from "express";
import validateRules from "../middlewares/validator";
import {DepositRules} from "../middlewares/validator/payload.validations";
import BalanceHandler from "../handlers/BalanceHandler";
import requirePermission from "../middlewares/permission";

const router = express.Router();

router.post(
  "/deposit",
  DepositRules(),
  validateRules(),
  requirePermission(),
  BalanceHandler.handleDeposit
);

export default router;
