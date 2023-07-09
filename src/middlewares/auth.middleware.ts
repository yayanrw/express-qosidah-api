// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../core/utils/jwt";
import { AuthenticationError } from "../core/utils/exceptions";
import { handleError } from "../core/utils/handleError";
import User from "../core/interface/user.interface";

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
        req.user = decoded as User;
        next();
      } else {
        throw new AuthenticationError("Invalid token");
      }
    } else {
      throw new AuthenticationError("Authorization header missing");
    }
  } catch (error) {
    handleError(res, error);
  }
};
