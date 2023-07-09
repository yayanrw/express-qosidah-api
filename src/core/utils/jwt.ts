import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/jwt.config";
import User from "../interface/user.interface";
import { AuthenticationError } from "./exceptions";

const createToken = (user: User): string => {
  return jwt.sign({ id: user.id }, JWT_SECRET as jwt.Secret, {
    expiresIn: JWT_EXPIRATION,
  });
};

const verifyToken = async (token: string): Promise<jwt.VerifyErrors | User> => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) {
        throw new AuthenticationError(err.message);
      }
      resolve(payload as User);
    });
  });
};

const refreshToken = (): string => {
  return jwt.sign({}, JWT_SECRET as jwt.Secret, { expiresIn: "7d" });
};

export { createToken, verifyToken, refreshToken };
