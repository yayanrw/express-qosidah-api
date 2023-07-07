import { User } from "@prisma/client";
import UserRepository from "./user.repository";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import { createUserSchema } from "./user.schema";

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
    const isEmailExist = await userRepository.getUserByEmail(userData.email);

    if (isEmailExist) {
      throw new ValidationError("Email already exists");
    }

    const { error, value } = createUserSchema.validate(userData);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await userRepository.createUser(value);
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
