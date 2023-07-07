import { User } from "@prisma/client";
import prisma from "../../core/config/prisma.config";

const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const createUser = async (userData: User): Promise<User> => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

const updateUser = async (
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

const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
