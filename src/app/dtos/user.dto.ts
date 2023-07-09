import { User } from "@prisma/client";

interface UserDto {
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

export { UserDto, userToUserDto };
