import dotenv from "dotenv";
import WebSocket, { WebSocketServer } from "ws";

dotenv.config();

const config = {
  port: parseInt(process.env.SERVER_PUBLIC_PORT || "3001"),
};

const wss = new WebSocketServer(config);
wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);
  ws.on("message", (message: string) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  console.log("client connected");
});
