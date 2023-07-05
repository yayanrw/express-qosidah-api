import express from "express";
import UserController from "../controllers/user_controller";

const router = express.Router();
const userController = new UserController();

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
