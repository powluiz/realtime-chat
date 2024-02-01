import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";

const onError = (ws: WebSocket, error: Error) => {
  console.log("error", error);
  ws.send(`Connection Error`);
};

// checar tipagem de data!!!!
const onMessage = (ws: WebSocket, data: WebSocket.Data) => {
  console.log(data);
  ws.send(`Message Received`);
};

const onConnection = (ws: WebSocket) => {
  ws.on("error", (error) => onError(ws, error));
  ws.on("message", (data) => onMessage(ws, data));
  console.log("client connected");
};

const appWs = (server: Server) => {
  const wss = new WebSocketServer({ server });
  wss.on("connection", onConnection);
  console.log("Web Socket Server is running");
  return wss;
};

export default appWs;
