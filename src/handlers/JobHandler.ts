import { NextFunction, Request, Response } from "express";
import { respond } from "../utils/response";
import JobController from "../controllers/JobController";

export default class JobHandler {
  public static async handleGetUnpaidJobs(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await JobController.getUnpaidJobs(
        res.locals.profile
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handlePayJob(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await JobController.payForJob(
        res.locals.profile,
        req.params.jobId
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}
