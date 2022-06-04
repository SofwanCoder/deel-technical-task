import { NextFunction, Request, Response } from "express";
import logger from "../internal/logger";
import {Profile} from "../models/Profile";
import UnauthorizedException from "../exceptions/http/UnauthorizedException";
import {respond} from "../utils/response";

export async function decryptAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const profileId = req.headers['profile_id'];

  if (!profileId) {
    return next();
  }

  const profile = await Profile.findByPk(profileId as string);

  if (!profile) {
    const e= new UnauthorizedException("Profile not found")
    respond(res, {
     code: e.code,
      message: e.message,
      ok: false
    })
  }

  res.locals.profile = profile;

  logger.info(`Profile ${profileId} authorized`);
  return next();
}
