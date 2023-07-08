import { Request, Response } from "express";
import { User } from "@prisma/client";
import UserService from "../services/user.service";
import { wrapResponse } from "../../core/utils/wrapResponse";
import HttpStatusCode from "../../core/enum/http-status-code";
import { wrapAsync } from "../../core/utils/wrapAsync";

const userService = new UserService();

export default class UserController {
  getAll = wrapAsync(async (req: Request, res: Response) => {
    const users = await userService.getAll();
    wrapResponse({ res, data: users });
  });

  getById = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    wrapResponse({ res, data: user });
  });

  create = wrapAsync(async (req: Request, res: Response) => {
    const data: User = req.body;
    const user = await userService.create(data);
    wrapResponse({
      res,
      data: user,
      message: "User created",
      statusCode: HttpStatusCode.CREATED,
    });
  });

  update = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: User = req.body;
    const user = await userService.update(id, updatedData);
    wrapResponse({ res, data: user, message: "User updated" });
  });

  delete = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.delete(id);
    wrapResponse({ res, message: "User deleted" });
  });
}
