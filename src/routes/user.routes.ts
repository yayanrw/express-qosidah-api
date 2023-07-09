import { Router } from "express";
import UserController from "../app/controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();
const userController = new UserController();

router.post("/", [authMiddleware, adminMiddleware], userController.create);
router.get("/", [authMiddleware, adminMiddleware], userController.getAll);
router.get("/:id", [authMiddleware], userController.getById);
router.put("/:id", [authMiddleware], userController.update);
router.delete("/:id", [authMiddleware, adminMiddleware], userController.delete);
router.put(
  "/:id/update-password",
  [authMiddleware],
  userController.updatePassword
);
router.put(
  "/:id/reset-password",
  [authMiddleware, adminMiddleware],
  userController.resetPassword
);

export default router;
