import { Request, Response } from "express";
import UserRepository from "../repositories/user_repository";

class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const createdUser = await this.userRepository.createUser(userData);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  };

  getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userRepository.getUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.userRepository.updateUser(id, userData);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUser = await this.userRepository.deleteUser(id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
}

export default UserController;
