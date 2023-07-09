import { User } from "@prisma/client";
import {
  AuthenticationError,
  ValidationError,
} from "../../core/utils/exceptions";
import LogInDto from "../dtos/login.dto";
import { UserTokenDto, userWithTokenToUserToken } from "../dtos/user_token.dto";
import UserRepository from "../repositories/user.repository";
import { logInSchema } from "../validations/auth.validation";
import bcrypt from "bcrypt";
import JwtRepository from "../repositories/jwt.repository";
import { userToUserDto } from "../dtos/user.dto";

const userRepository = new UserRepository();
const jwtRepository = new JwtRepository();

export default class AuthService {
  logIn = async (logInDto: LogInDto): Promise<UserTokenDto> => {
    const { error } = logInSchema.validate(logInDto);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user: User | null = await userRepository.getByEmail(logInDto.email);
    if (!user) {
      throw new AuthenticationError("Email is not registered");
    }

    const isPasswordValid = await bcrypt.compare(
      logInDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new AuthenticationError("Password is invalid");
    }

    const generatedToken = await jwtRepository.createToken(userToUserDto(user));
    const userToken = userWithTokenToUserToken(
      userToUserDto(user),
      generatedToken
    );

    return userToken;
  };
}
