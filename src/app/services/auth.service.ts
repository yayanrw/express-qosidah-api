import { User } from "@prisma/client";
import { AuthenticationError } from "../../core/utils/exceptions";
import LogInDto from "../dtos/login.dto";
import { UserTokenDto, userWithTokenToUserToken } from "../dtos/user_token.dto";
import { logInValidation } from "../validations/auth.validation";
import { userToUserDto } from "../dtos/user.dto";
import { validate } from "../../core/utils/base.validation";
import { userRepository } from "../common/repositories";
import { isStringsValid } from "../../core/utils/bcrypt.helper";
import { createToken } from "../../core/utils/jwt.helper";

export default class AuthService {
  logIn = async (logInDto: LogInDto): Promise<UserTokenDto> => {
    validate(logInValidation, logInDto);

    const user: User | null = await userRepository.getByEmail(logInDto.email);
    if (!user) {
      throw new AuthenticationError("Email or Password incorrect");
    }

    const isPasswordValid = isStringsValid(logInDto.password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Email or Password incorrect");
    }

    const generatedToken = await createToken(userToUserDto(user));
    const userToken = userWithTokenToUserToken(
      userToUserDto(user),
      generatedToken
    );

    return userToken;
  };
}
