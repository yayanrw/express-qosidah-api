import { UserDto } from "../../app/dtos/user.dto";
import { JWT_EXPIRATION, JWT_SECRET } from "../../core/config/jwt.config";
import { AuthenticationError } from "../../core/utils/exceptions";
import jwt from "jsonwebtoken";

const createToken = async (userDto: UserDto): Promise<string> => {
  return jwt.sign(userDto, JWT_SECRET as jwt.Secret, {
    expiresIn: JWT_EXPIRATION,
  });
};

const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | UserDto> => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET as jwt.Secret, (error, payload) => {
      if (error) {
        throw new AuthenticationError(error.message);
      }
      resolve(payload as UserDto);
    });
  });
};

export { createToken, verifyToken };
