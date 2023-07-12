// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../core/utils/exceptions";
import { handleError } from "../core/utils/handleError";
import { UserDto } from "../app/dtos/user.dto";
import { verifyToken } from "../core/utils/jwt.helper";

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
        req.user = decoded as UserDto;
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
