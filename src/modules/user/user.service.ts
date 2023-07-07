import { User } from "@prisma/client";
import UserRepository from "./user.repository";
import { NotFoundError } from "../../core/utils/exceptions";

const userRepository = new UserRepository();

export default class UserService {
  getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
  };

  getUserById = async (id: string): Promise<User | null> => {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  };

  createUser = async (userData: User): Promise<User> => {
    const user = await userRepository.createUser(userData);
    return user;
  };

  updateUser = async (
    id: string,
    updatedUserData: User
  ): Promise<User | null> => {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    const user = await userRepository.updateUser(id, updatedUserData);
    return user;
  };

  deleteUser = async (id: string): Promise<void> => {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    await userRepository.deleteUser(id);
  };
}
