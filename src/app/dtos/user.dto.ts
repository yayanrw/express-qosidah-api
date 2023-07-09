import { User } from "@prisma/client";

interface UserDto {
  email: string;
  name?: string | null;
  role: string;
}

interface UserDtoWithIdDto {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

function userToUserDto(user: User): UserDto {
  const { email, name, role } = user;

  return {
    email,
    name: name || null,
    role,
  };
}

function userToUserDtoWithIdDto(user: User): UserDtoWithIdDto {
  const { id, email, name, role } = user;

  return {
    id,
    email,
    name: name || null,
    role,
  };
}

export { UserDto, userToUserDto, userToUserDtoWithIdDto, UserDtoWithIdDto };
