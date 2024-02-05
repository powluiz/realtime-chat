import { Message } from './message'
import { Contact } from './user'

export interface Chat {
  id: string
  name: string
  participants: Contact[]
  messages: Message[]
}
