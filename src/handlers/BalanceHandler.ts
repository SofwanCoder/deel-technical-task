import { NextFunction, Request, Response } from "express";
import { respond } from "../utils/response";
import BalanceController from "../controllers/BalanceController";

export default class BalanceHandler {

  public static async handleDeposit(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await BalanceController.depositAmount(
        res.locals.profile,
        req.body
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}
