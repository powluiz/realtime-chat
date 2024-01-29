import { Router } from "express";
import { AuthController, ChatController, UserController } from "./controllers";

const userController = new UserController();
const authController = new AuthController();
const chatController = new ChatController();

export const router = Router();

router.post("/user/login", authController.authenticate);
router.post("/user/register", userController.register);

// NEED AUTHENTICATION
// router.get("/users", AuthMiddleware, userController.index);
router.get("/users", userController.list);
router.get("/user/getme", userController.getMe);
router.put("/user/update", userController.updateUser);
router.delete("/user/delete", userController.deleteUser);

router.post("/chat/register", chatController.list);
router.post("/chat/register", chatController.createChat);
