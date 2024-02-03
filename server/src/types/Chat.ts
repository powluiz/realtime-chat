import { Message } from "./Message";

export interface Chat {
  id: string;
  name: string;
  participants: string;
  messages: Message[];
}
