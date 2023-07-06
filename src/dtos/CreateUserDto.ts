import { IsString, IsEmail, IsEnum } from "class-validator";

enum UserRole {
  Admin = "Admin",
  User = "User",
}

export default class CreateUserDto {
  @IsString()
  public name: string | null;

  @IsEmail()
  public email: string;

  @IsEnum(UserRole)
  public role: UserRole | null;

  constructor(id: string, name: string, email: string, role: UserRole) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
