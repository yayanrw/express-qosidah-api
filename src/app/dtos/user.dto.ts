import { User } from "@prisma/client";

interface UserDto {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  createdAt: Date;
}

function userToUserDto(user: User): UserDto {
  const { id, email, name, role, createdAt } = user;

  return {
    id,
    email,
    name: name || null,
    role,
    createdAt: createdAt || null,
  };
}

export { UserDto, userToUserDto };
