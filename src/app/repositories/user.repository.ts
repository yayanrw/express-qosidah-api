import { User } from "@prisma/client";
import prisma from "../../core/config/prisma.config";
import { UserDto } from "../dtos/user.dto";
import bcrypt from "bcrypt";

export default class UserRepository {
  getAll = async (): Promise<UserDto[]> => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    return users;
  };

  getById = async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  };

  getByEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  };

  isPasswordValid = async (
    inputPassword: string,
    userPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, userPassword);
  };

  create = async (data: User): Promise<User> => {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  };

  update = async (id: string, updatedData: User): Promise<User> => {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    });
    return user;
  };

  updatePassword = async (
    id: string,
    newPassword: string
  ): Promise<UserDto | null> => {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
    return user;
  };

  delete = async (id: string): Promise<void> => {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  };
}
