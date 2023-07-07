import { Request, Response } from "express";
import { User } from "@prisma/client";
import UserService from "./user.service";
import { wrapResponse } from "../../core/utils/wrapResponse";
import HttpStatusCode from "../../core/enum/http-status-code";
import { wrapAsync } from "../../core/utils/wrapAsync";

const userService = new UserService();

export default class UserController {
  getUsers = wrapAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    wrapResponse({ res, data: users });
  });

  getUserById = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    wrapResponse({ res, data: user });
  });

  createUser = wrapAsync(async (req: Request, res: Response) => {
    const userData: User = req.body;
    const user = await userService.createUser(userData);
    wrapResponse({ res, data: user, statusCode: HttpStatusCode.CREATED });
  });

  updateUser = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUserData: User = req.body;
    const user = await userService.updateUser(id, updatedUserData);
    wrapResponse({ res, data: user, message: "User updated" });
  });

  deleteUser = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    wrapResponse({ res, message: "User deleted" });
  });
}
