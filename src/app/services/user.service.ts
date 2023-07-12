import { User } from "@prisma/client";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../core/utils/exceptions";
import PasswordUpdateDto from "../dtos/password_update.dto";
import { UserDto, userToUserDto } from "../dtos/user.dto";
import { userRepository } from "../common/repositories";
import { validate } from "../../core/utils/base.validation";
import { encrypt, isStringsValid } from "../../core/utils/bcrypt.helper";
import {
  createUserValidation,
  resetPasswordUserValidation,
  updatePasswordUserValidation,
  updateUserValidation,
} from "../validations/user.validation";

export default class UserService {
  getAll = async (): Promise<UserDto[]> => {
    return userRepository.getAll();
  };

  getById = async (id: string): Promise<UserDto | null> => {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return userToUserDto(user);
  };

  create = async (data: User): Promise<UserDto> => {
    const value = validate(createUserValidation, data);

    const isEmailExist = await userRepository.getByEmail(data.email);

    if (isEmailExist) {
      throw new ConflictError("Email already exists");
    }
    value.password = await encrypt(data.password);

    const user = await userRepository.create(value);
    return userToUserDto(user);
  };

  update = async (id: string, updateData: User): Promise<UserDto | null> => {
    const value = validate(updateUserValidation, updateData);

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
    return userToUserDto(user);
  };

  updatePassword = async ({
    id,
    currentUserId,
    passwordUpdate,
  }: {
    id: string;
    currentUserId: string;
    passwordUpdate: PasswordUpdateDto;
  }): Promise<UserDto | null> => {
    const value = validate(updatePasswordUserValidation, passwordUpdate);

    if (currentUserId !== id) {
      throw new AuthorizationError(
        "Unauthorized. You have no permission to update this"
      );
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

    const isCurrentPasswordValid = await isStringsValid(
      passwordUpdate.currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new ValidationError("Current password is not valid");
    }

    const hashedPassword = await encrypt(value.newPassword);
    const updatedUser = await userRepository.updatePassword(id, hashedPassword);
    return updatedUser;
  };

  resetPassword = async (
    id: string,
    newPassword: string
  ): Promise<UserDto | null> => {
    const value = validate(resetPasswordUserValidation, newPassword);

    const user = await userRepository.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const hashedPassword = await encrypt(value);
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
