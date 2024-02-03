import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { IncomingMessage } from "./types/Message";

// map to link socketId to userId: [socketId, userId]
const socketToClientMap = new Map<string, string>();

const getUserIdBySocketId = (socketId: string) =>
  socketToClientMap.get(socketId);

const getSocketIdByUserId = (userId: string) =>
  [...socketToClientMap].find((item) => item[1] === userId)?.[0];

const linkSocketToClient = async (socketId: string, userId: string) => {
  socketToClientMap.set(socketId, userId);
};

const unlinkClientBySocket = async (socketId: string) =>
  socketToClientMap.delete(socketId);

// const checkClientActiveSocket = async (userId: string) => {
//   const linkedSocketId = await getSocketIdByUserId(userId);
//   if (!linkedSocketId) {
//     linkSocketToClient(linkedSocketId, userId);
//   }
//   return linkedSocketId;
// };

// /////////////////////////////////////////////////////////////////////

const onMessage = (socket: Socket, data: string) => {
  const { senderId, chatId, content }: IncomingMessage = JSON.parse(data);
  console.log(senderId, chatId, content.image, content.text);
  // socket.emit("teste", "Message Received");
};

const onConnection = (socket: Socket) => {
  let hasReceivedClientId = false;

  socket.emit("clientIdRequest");
  socket.once("clientIdResponse", (clientId: string) => {
    if (!clientId) {
      console.log("clientId is undefined");
      return;
    }
    linkSocketToClient(socket.id, clientId);
    hasReceivedClientId = true;
  });

  const handleDisconnect = (socketId: string) => {
    console.log("Client Disconnected");
    unlinkClientBySocket(socket.id);
  };

  socket.on("error", (error) => console.log("error", error));
  socket.on("disconnect", () => handleDisconnect(socket.id));
  socket.on("message", (data) => {
    console.log(data);
    if (!hasReceivedClientId) {
      console.log("Client ID not received yet");
      return;
    }
    onMessage(socket, data);
  });
  console.log("websocket client connected");
};

const initWebSocketApp = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_PUBLIC_URL,
    },
  });
  io.on("connect", onConnection);
  console.log("WebSocket Server is running");
  return io;
};

export default initWebSocketApp;
