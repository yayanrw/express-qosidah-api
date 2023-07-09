import { AuthenticationError } from "../../core/utils/exceptions";
import { wrapAsync } from "../../core/utils/wrapAsync";
import LogInDto from "../dtos/login.dto";
import UserRepository from "../repositories/user.repository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createToken } from "../../core/utils/jwt";
import { User } from "@prisma/client";
import { wrapResponse } from "../../core/utils/wrapResponse";

const userRepository = new UserRepository();

export default class AuthController {
  logIn = wrapAsync(async (req: Request, res: Response) => {
    const logInDto: LogInDto = req.body;

    const user: User | null = await userRepository.getByEmail(logInDto.email);
    if (!user) {
      throw new AuthenticationError("Email is invalid");
    }

    const isPasswordValid = await bcrypt.compare(
      logInDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new AuthenticationError("Password is invalid");
    }

    const generateToken = createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    wrapResponse({
      res,
      data: {
        accessToken: generateToken,
      },
    });
  });
}
