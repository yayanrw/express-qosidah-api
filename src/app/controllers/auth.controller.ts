import { wrapAsync } from "../../core/utils/wrapAsync";
import LogInDto from "../dtos/login.dto";
import { Request, Response } from "express";
import { wrapResponse } from "../../core/utils/wrapResponse";
import { authService } from "../common/services";

export default class AuthController {
  logIn = wrapAsync(async (req: Request, res: Response) => {
    const logInDto: LogInDto = req.body;
    const data = await authService.logIn(logInDto);

    wrapResponse({
      res,
      data: data,
    });
  });
}
