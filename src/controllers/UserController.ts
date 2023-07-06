import {
  BadRequestError,
  Get,
  JsonController,
  NotFoundError,
  Res,
  Param,
} from "routing-controllers";
import UserService from "../services/UserService";
import { User } from "@prisma/client";
import { wrapResponse } from "../core/utils/responseWrapper";
import HttpStatusCode from "../core/enum/http-status-code";
import { Response } from "express";

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
      if (error instanceof NotFoundError) {
        wrapResponse<null>({
          res,
          error: "Internal Server Error",
          message: error.message,
          data: null,
          statusCode: HttpStatusCode.NOT_FOUND,
        });
        return;
      } else if (error instanceof BadRequestError) {
        wrapResponse<null>({
          res,
          error: "Bad Request Error",
          message: error.message,
          data: null,
          statusCode: HttpStatusCode.BAD_REQUEST,
        });
        return;
      } else {
        wrapResponse<null>({
          res,
          error: "Internal Server Error",
          message: "Internal Server Error",
          data: null,
          statusCode: HttpStatusCode.NOT_FOUND,
        });
        return;
      }
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
      if (error instanceof NotFoundError) {
        return wrapResponse<null>({
          res,
          error: "NOT_FOUND",
          message: error.message,
          data: null,
          statusCode: HttpStatusCode.NOT_FOUND,
        });
      } else if (error instanceof BadRequestError) {
        wrapResponse<null>({
          res,
          error: "Bad Request Error",
          message: error.message,
          data: null,
          statusCode: HttpStatusCode.BAD_REQUEST,
        });
        return;
      } else {
        wrapResponse<null>({
          res,
          error: "Internal Server Error",
          message: "Internal Server Error",
          data: null,
          statusCode: HttpStatusCode.NOT_FOUND,
        });
        return;
      }
    }
  }
}
