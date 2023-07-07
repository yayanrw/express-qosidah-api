import { User } from "@prisma/client";
import UserRepository from "./user.repository";
import { NotFoundError, ValidationError } from "../../core/utils/exceptions";
import { userSchema } from "./user.schema";

const userRepository = new UserRepository();

export default class UserService {
  getAll = async (): Promise<User[]> => {
    return userRepository.getAll();
  };

  getById = async (id: string): Promise<User | null> => {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  };

  create = async (data: User): Promise<User> => {
    const isEmailExist = await userRepository.getByEmail(data.email);

    if (isEmailExist) {
      throw new ValidationError("Email already exists");
    }

    const { error, value } = userSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await userRepository.create(value);
    return user;
  };

  update = async (id: string, updateData: User): Promise<User | null> => {
    const isExist = await userRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("User not found");
    }

    if (isExist.email != updateData.email) {
      const isEmailExist = await userRepository.getByEmail(updateData.email);

      if (isEmailExist) {
        throw new ValidationError("Email already exists");
      }
    }

    const { error, value } = userSchema.validate(updateData);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await userRepository.update(id, value);
    return user;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await userRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("User not found");
    }
    await userRepository.delete(id);
  };
}
