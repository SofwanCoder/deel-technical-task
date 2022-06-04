import { NextFunction, Request, Response } from "express";
import ContractController from "../controllers/ContractController";
import { respond } from "../utils/response";

class ContractHandler {
  public static async handleGetContract(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ContractController.getContract(
        req.params.contractId
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleGetContracts(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ContractController.getContracts(
        res.locals.profile
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}

export default ContractHandler;
