export interface MessageContent {
  text: string | null;
  image: string | null;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: MessageContent;
  createdAt: string;
}

export interface IncomingMessage extends Omit<Message, "id" | "createdAt"> {}
export interface OutgoingMessage extends Message {}
