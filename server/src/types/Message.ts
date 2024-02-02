export interface MessageContent {
  text?: string;
  image?: string;
}

export interface Message {
  messageId: string;
  chatId: string;
  senderId: string;
  content: MessageContent;
  createdAt: string;
}

export interface IncomingMessage
  extends Omit<Message, "messageId" | "createdAt"> {}
export interface OutgoingMessage extends Message {}
