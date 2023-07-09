import UserDto from "./user.dto";

export default interface UserTokenDto {
  user: UserDto;
  accessToken: string;
}
