// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../core/utils/exceptions";
import { handleError } from "../core/utils/handleError";
import User from "../core/interface/user.interface";
import JwtRepository from "../app/repositories/jwt.repository";

const jwtRepository = new JwtRepository();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = await jwtRepository.verifyToken(token);
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
