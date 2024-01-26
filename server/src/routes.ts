import { Router } from "express";
import { AuthController, UserController } from "./controllers";

const userController = new UserController();
const authController = new AuthController();

export const router = Router();

router.get("/users", userController.index);
router.post("/user/create", userController.store);
router.post("/user/login", authController.authenticate);
