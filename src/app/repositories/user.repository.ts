import { User } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class UserRepository {
  getAll = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
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

  create = async (data: User): Promise<User> => {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  };

  update = async (id: string, updatedData: User): Promise<User | null> => {
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
  ): Promise<User | null> => {
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
