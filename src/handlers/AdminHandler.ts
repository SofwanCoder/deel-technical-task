import { NextFunction, Request, Response } from "express";
import { respond } from "../utils/response";
import AdminController from "../controllers/AdminController";

export default class AdminHandler {
  public static async handleGetBestProfession(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminController.getBestProfession();
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleGetBestClient(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminController.getBestClient();
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}
