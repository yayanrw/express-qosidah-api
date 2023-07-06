import { Get, JsonController, Res, Param } from "routing-controllers";
import UserService from "../services/UserService";
import { User } from "@prisma/client";
import { wrapResponse } from "../core/utils/responseWrapper";
import { Response } from "express";
import { handleError } from "../core/utils/handleError";

@JsonController("/users")
export default class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  @Get("/")
  async getUsers(@Res() res: Response) {
    try {
      const users = await this._userService.getAll();
      return wrapResponse<User[]>({
        res,
        data: users,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  @Get("/:uuid")
  async getUserById(@Param("uuid") id: string, @Res() res: Response) {
    try {
      const user = await this._userService.getById(id);
      return wrapResponse<User>({
        res,
        data: user,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
