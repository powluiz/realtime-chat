import { Router } from "express";
import { AuthController, UserController } from "./controllers";
// import { AuthMiddleware } from "./middlewares";

const userController = new UserController();
const authController = new AuthController();

export const router = Router();

// router.get("/users", AuthMiddleware, userController.index);
router.get("/users", userController.index);
router.post("/user/login", authController.authenticate);
router.post("/user/register", userController.register);
