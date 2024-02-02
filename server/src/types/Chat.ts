import { Message } from "./Message";

export interface Chat {
  chatId: string;
  name: string;
  participants: string;
  messages: Message[];
}
