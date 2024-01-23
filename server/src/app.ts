import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const config = {
  cors: {
    origin: process.env.CLIENT_PUBLIC_URL,
    methods: ["GET", "POST"],
  },
};

const io = new Server(config);
const port = parseInt(process.env.SERVER_PUBLIC_PORT || "3001");
io.listen(port);
