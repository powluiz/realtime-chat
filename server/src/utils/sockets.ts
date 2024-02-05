export enum SOCKET_EVENTS {
  ERROR = "error",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CLIENT_RECOGNITION = "client-recognition",
  CLIENT_RECOGNITION_CONFIRM = "client-recognition-confirmation",
  CHAT_MESSAGE = "chat-message",
  CHAT_MESSAGE_INVALID = "chat-message-invalid",
}

export const getUserIdBySocketId = (
  socketToClientMap: Map<string, string>,
  socketId: string
) => socketToClientMap.get(socketId);

export const getSocketIdByUserId = (
  socketToClientMap: Map<string, string>,
  userId: string
) => [...socketToClientMap].find((item) => item[1] === userId)?.[0];

export const linkSocketToClient = async (
  socketToClientMap: Map<string, string>,
  socketId: string,
  userId: string
) => {
  socketToClientMap.set(socketId, userId);
};

export const unlinkClientBySocket = async (
  socketToClientMap: Map<string, string>,
  socketId: string
) => socketToClientMap.delete(socketId);
