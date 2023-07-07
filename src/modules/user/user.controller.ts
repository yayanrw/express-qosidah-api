import { Request, Response } from "express";
import { User } from "@prisma/client";
import { handleError } from "../../core/utils/handleError";
import UserService from "./user.service";
import { wrapResponse } from "../../core/utils/responseWrapper";
import HttpStatusCode from "../../core/enum/http-status-code";

const userService = new UserService();

export default class UserController {
  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      wrapResponse({ res, data: users });
    } catch (error) {
      handleError(res, error);
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      wrapResponse({ res, data: user });
    } catch (error) {
      handleError(res, error);
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    const userData: User = req.body;
    try {
      const user = await userService.createUser(userData);
      wrapResponse({ res, data: user, statusCode: HttpStatusCode.CREATED });
    } catch (error) {
      handleError(res, error);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedUserData: User = req.body;
    try {
      const user = await userService.updateUser(id, updatedUserData);
      res.json(user);
    } catch (error) {
      handleError(res, error);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await userService.deleteUser(id);
      res.status(204).end();
    } catch (error) {
      handleError(res, error);
    }
  };
}
