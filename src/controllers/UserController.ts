import { Request, Response } from "express";
import { JsonController } from "routing-controllers";
import UserRepository from "../repositories/user_repository";

/**
 * UserController class
 * @class
 */
@JsonController("/users")
export default class UserController {
  /**
   * UserRepository constructor
   * @private
   * @type {UserRepository}
   */
  private userRepository: UserRepository;

  /**
   * Instantiates UserService
   * @constructor
   * @returns void
   */
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Get all users
   * @memberof UserController
   * @returns {Promise<IUser>}
   */
}
