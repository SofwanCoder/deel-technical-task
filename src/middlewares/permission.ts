import { NextFunction, Request, Response } from "express";
import ForbiddenException from "../exceptions/http/ForbiddenException";
import UnauthorizedException from "../exceptions/http/UnauthorizedException";
import {Profile} from "../models/Profile";
import {ProfileType} from "../types/enums/profile.enums";

export default function requirePermission(clearance?: ProfileType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const profile: Profile = res.locals.profile;

    if (!profile) {
      throw new UnauthorizedException("Unauthorized access");
    }

    // logger.info(JSON.stringify(authorizedUser));

    if (!clearance) {
      return next();
    }

    if (profile.type !== clearance) {
      throw new ForbiddenException("Authorization restricted");
    }

    next();
  };
}
