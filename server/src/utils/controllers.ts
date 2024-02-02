import { AuthController, ChatController, UserController } from "../controllers";

const userController = new UserController();
const authController = new AuthController();
const chatController = new ChatController();

export { userController, authController, chatController };
