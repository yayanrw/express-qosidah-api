import { IsEmail, IsString } from "class-validator";

export default class UserDto {
  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public role: string;

  constructor(id: string, name: string, email: string, role: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
