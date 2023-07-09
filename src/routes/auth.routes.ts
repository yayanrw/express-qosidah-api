import { Router } from "express";
import AuthController from "../app/controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.logIn);

export default router;
