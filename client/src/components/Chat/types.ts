import { Chat } from '@/DTOs/chat'

export interface ChatProps extends Omit<Chat, 'messages'> {}
