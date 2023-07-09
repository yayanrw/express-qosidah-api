import { UserDto } from "./user.dto";

interface UserTokenDto {
  user: UserDto;
  accessToken: string;
}

function userWithTokenToUserToken(
  userDto: UserDto,
  accessToken: string
): UserTokenDto {
  return {
    user: userDto,
    accessToken: accessToken,
  };
}

export { UserTokenDto, userWithTokenToUserToken };
