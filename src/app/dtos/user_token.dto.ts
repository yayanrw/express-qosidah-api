import UserDto from "./user.dto";

export default interface UserToken {
  user: UserDto;
  accessToken: string;
}
