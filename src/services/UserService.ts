import UserRepository from "../repositories/UserRepository";
import { User } from "@prisma/client";
import { InternalServerError, NotFoundError } from "routing-controllers";

export default class UserService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async getAll(): Promise<User[]> {
    try {
      return await this._userRepository.getUsers();
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  async getById(id: string): Promise<User> {
    try {
      const user = await this._userRepository.getUserById(id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error; // Re-throw the NotFoundError
      }
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      return await this._userRepository.createUser(user);
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  async update(id: string, updatedUser: User): Promise<User | null> {
    try {
      return await this._userRepository.updateUser(id, updatedUser);
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.getById(id);
      await this._userRepository.deleteUser(id);
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }
}
