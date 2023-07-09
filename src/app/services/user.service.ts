import { User } from "@prisma/client";
import UserRepository from "../repositories/user.repository";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../core/utils/exceptions";
import {
  createUserSchema,
  updatePasswordUserSchema,
  updateUserSchema,
} from "../validations/user.validation";
import bcrypt from "bcrypt";
import PasswordUpdateDto from "../dtos/password_update.dto";

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
    const { error, value } = createUserSchema.validate(data);

    if (error) {
      throw new ValidationError(error.message);
    }

    const isEmailExist = await userRepository.getByEmail(data.email);

    if (isEmailExist) {
      throw new ConflictError("Email already exists");
    }
    value.password = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create(value);
    return user;
  };

  update = async (id: string, updateData: User): Promise<User | null> => {
    const { error, value } = updateUserSchema.validate(updateData);

    if (error) {
      throw new ValidationError(error.message);
    }

    const isExist = await userRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("User not found");
    }

    if (isExist.email != updateData.email) {
      const isEmailExist = await userRepository.getByEmail(updateData.email);

      if (isEmailExist) {
        throw new ConflictError("Email already exists");
      }
    }

    const user = await userRepository.update(id, value);
    return user;
  };

  updatePassword = async (
    id: string,
    passwordUpdate: PasswordUpdateDto
  ): Promise<User | null> => {
    const { error, value } = updatePasswordUserSchema.validate(passwordUpdate);

    if (error) {
      throw new ValidationError(error.message);
    }

    if (passwordUpdate.currentPassword === passwordUpdate.newPassword) {
      throw new ValidationError(
        "The new password cannot be the same as the old password"
      );
    }

    const user = await userRepository.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      passwordUpdate.currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new ValidationError("Current password is not valid");
    }

    const hashedPassword = await bcrypt.hash(value.newPassword, 10);
    const updatedUser = await userRepository.updatePassword(id, hashedPassword);
    return updatedUser;
  };

  delete = async (id: string): Promise<void> => {
    const isExist = await userRepository.getById(id);
    if (!isExist) {
      throw new NotFoundError("User not found");
    }
    await userRepository.delete(id);
  };
}
