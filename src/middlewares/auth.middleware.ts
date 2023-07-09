// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../core/utils/jwt";
import { AuthorizationError } from "../core/utils/exceptions";
import { handleError } from "../core/utils/handleError";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = await verifyToken(token);
      if (decoded) {
        next();
      } else {
        throw new AuthorizationError("Invalid token");
      }
    } else {
      throw new AuthorizationError("Authorization header missing");
    }
  } catch (error) {
    handleError(res, error);
  }
};
