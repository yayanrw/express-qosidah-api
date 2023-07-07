import { IsString, IsEmail, IsEnum } from "class-validator";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}

export class CreateUserDto {
  @IsString()
  public name: string | null;

  @IsEmail()
  public email: string;

  @IsEnum(UserRole)
  public role: UserRole | null;

  constructor(name: string, email: string, role: UserRole) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
