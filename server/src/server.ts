import dotenv from "dotenv";
// import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import cors from "cors";
import { router } from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const serverPort = process.env.SERVER_PUBLIC_PORT || "3001";

app.listen(parseInt(serverPort), () => {
  console.log(
    `server is running on port ${process.env.SERVER_PUBLIC_ADDRESS}:${serverPort}`
  );
});

// const wssConfig = {
//   port: parseInt(process.env.SERVER_PUBLIC_PORT || "3001"),
// };
//
// const wss = new WebSocketServer(wssConfig);
// wss.on("connection", (ws: WebSocket) => {
//   ws.on("error", console.error);
//   ws.on("message", (message: string) => {
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });

//   console.log("client connected");
// });

// dynamoDB
