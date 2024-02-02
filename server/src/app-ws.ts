import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { IncomingMessage } from "./types/Message";
import { chatController } from "./utils/controllers";
import { User } from "./types/User";
import { socketClientMap } from "./utils/sockets";

const onError = (error: Error) => {
  console.log("error", error);
};

const onMessage = (socket: Socket, data: string) => {
  const { senderId, chatId, content }: IncomingMessage = JSON.parse(data);
  console.log(senderId, chatId, content.image, content.text);
  // socket.emit("teste", "Message Received");
  chatController.createMessage(senderId, chatId, content);
};

const onConnection = (socket: Socket) => {
  let hasReceivedClientId = false;

  socket.emit("findClientId"); // tell the client to send its id
  socket.once("clientId", (clientId: string) => {
    if (!clientId) {
      console.log("clientId is undefined");
      return;
    }
    socketClientMap.set(socket.id, clientId);
    hasReceivedClientId = true;
  });
  // socketClientMap.set(socket.id, { id: "1", name: "Teste" });
  socket.on("error", (error) => onError(error));
  socket.on("message", (data) => {
    if (!hasReceivedClientId) {
      console.log("Client ID not received yet");
      return;
    }
    onMessage(socket, data);
  });
  console.log("websocket client connected");
};

const initWebSocketApp = (server: HTTPServer) => {
  const io = new SocketIOServer(server);
  io.on("connection", onConnection);
  console.log("WebSocket Server is running");
  return io;
};

export default initWebSocketApp;
