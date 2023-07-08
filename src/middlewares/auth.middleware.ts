// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../core/utils/jwt";
import { User } from "@prisma/client";
import { AuthorizationError } from "../core/utils/exceptions";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decoded = await verifyToken(token);
    if (decoded) {
      req.user = decoded as User;
      next();
    } else {
      throw new AuthorizationError("Invalid token");
    }
  } else {
    throw new AuthorizationError("Authorization header missing");
  }
};
