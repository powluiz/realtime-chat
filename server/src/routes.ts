import { Router } from "express";
import {
  authController,
  chatController,
  userController,
} from "./utils/controllers";

export const router = Router();

router.post("/user/login", authController.login);
router.post("/user/register", userController.register);

// NEED AUTHENTICATION
// router.get("/users", AuthMiddleware, userController.index);
router.get("/users", userController.list);
router.get("/user/getme", userController.getMe);
router.put("/user/update", userController.updateUser);
router.delete("/user/delete", userController.deleteUser);

router.post("/chat/register", chatController.list);
