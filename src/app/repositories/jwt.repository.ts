import { JWT_EXPIRATION, JWT_SECRET } from "../../core/config/jwt.config";
import { AuthenticationError } from "../../core/utils/exceptions";
import { UserDto } from "../dtos/user.dto";
import jwt from "jsonwebtoken";

export default class JwtRepository {
  createToken = async (userDto: UserDto): Promise<string> => {
    return jwt.sign(userDto, JWT_SECRET as jwt.Secret, {
      expiresIn: JWT_EXPIRATION,
    });
  };

  verifyToken = async (token: string): Promise<jwt.VerifyErrors | UserDto> => {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET as jwt.Secret, (error, payload) => {
        if (error) {
          throw new AuthenticationError(error.message);
        }
        resolve(payload as UserDto);
      });
    });
  };
}
