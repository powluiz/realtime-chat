import { Contact } from './user'

export interface MessageContent {
  text?: string
  image?: string
}

export interface Message {
  id: string
  chatId: string
  sender: Contact
  content: MessageContent
  timestamp: string
}
