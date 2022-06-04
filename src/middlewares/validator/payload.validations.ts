import { body } from "express-validator";

export function DepositRules() {
  return [
    body("amount").isNumeric().toFloat().isFloat({ min: 1 }),
  ];
}
