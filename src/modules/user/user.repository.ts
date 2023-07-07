import { User } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

export default class UserRepository {
  getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users;
  };

  getUserById = async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  };

  createUser = async (userData: User): Promise<User> => {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  };

  updateUser = async (
    id: string,
    updatedUserData: User
  ): Promise<User | null> => {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updatedUserData,
    });
    return user;
  };

  deleteUser = async (id: string): Promise<void> => {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  };
}
