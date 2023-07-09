import { NextFunction, Request, Response } from "express";
import {
  AuthenticationError,
  AuthorizationError,
} from "../core/utils/exceptions";
import { handleError } from "../core/utils/handleError";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user) {
      throw new AuthenticationError("Unauthenticated");
    }

    if (req.user.role !== "Admin") {
      throw new AuthorizationError("Unauthorized. You do not have permission.");
    }

    next();
  } catch (error) {
    handleError(res, error);
  }
};
