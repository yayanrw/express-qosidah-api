import { Router } from "express";
import UserController from "../app/controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
router.put("/:id/update-password", userController.updatePassword);
router.put("/:id/reset-password", userController.resetPassword);

export default router;
