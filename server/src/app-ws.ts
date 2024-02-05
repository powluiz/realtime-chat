import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { IncomingMessage } from "./types/Message";
import {
  SOCKET_EVENTS,
  linkSocketToClient,
  unlinkClientBySocket,
} from "./utils/sockets";

// map to link socketId to userId: [socketId, userId]
const socketToClientMap = new Map<string, string>();

const handleChatMessage = (socket: Socket, data: any) => {
  const { senderId, chatId, content }: IncomingMessage = data;
  if (!senderId || !chatId || !content) {
    console.log("Invalid Message Data");
    socket.emit(SOCKET_EVENTS.CHAT_MESSAGE_INVALID, "Invalid Message Data");
    return;
  }
  console.log(senderId, chatId, content.text, content.image);
};

const handleClientAuthentication = (socket: Socket, data: any) => {
  const { id: socketId } = socket;
  const { userId: clientId } = data;

  if (!clientId) {
    console.log("clientId was not provided");
    socket.disconnect();
    return;
  }

  socket.emit(SOCKET_EVENTS.CLIENT_RECOGNITION_CONFIRM, "ClientId Received");
  linkSocketToClient(socketToClientMap, socketId, clientId);
  console.log(`Client ${clientId} linked to socket ${socketId}`);
};

const handleDisconnect = (socket: Socket) => {
  unlinkClientBySocket(socketToClientMap, socket?.id);
  console.log("Client Disconnected");
};

const onConnection = (socket: Socket) => {
  socket.once(SOCKET_EVENTS.CLIENT_RECOGNITION, (data) =>
    handleClientAuthentication(socket, data)
  );
  socket.on(SOCKET_EVENTS.CHAT_MESSAGE, (data) =>
    handleChatMessage(socket, data)
  );

  socket.on(SOCKET_EVENTS.DISCONNECT, () => handleDisconnect(socket));
  socket.on(SOCKET_EVENTS.ERROR, (error) => console.log(error));
};

const initWebSocketApp = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_PUBLIC_URL,
    },
  });
  io.on(SOCKET_EVENTS.CONNECT, onConnection);
  console.log("WebSocket Server is running");

  return io;
};

export default initWebSocketApp;
