// map to link socketId to userId: [socketId, userId]
export const socketClientMap = new Map<string, string>();

export const getSocketIdByUserId = async (userId: string) => {
  for (const [socketId, _] of socketClientMap) {
    if (socketId === userId) {
      return socketId;
    }
  }
  return null;
};

export const getUserIdBySocketId = async (socketId: string) => {
  for (const [_, userId] of socketClientMap) {
    if (userId === socketId) {
      return userId;
    }
  }
  return null;
};
