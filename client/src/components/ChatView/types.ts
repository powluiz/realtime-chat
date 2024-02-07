import { Chat } from '@/DTOs/chat'
import { OutgoingMessage } from '@/DTOs/message'

export interface FullChatProps extends Chat {
  onSend?: (messageData: OutgoingMessage) => void
  onReturn?: () => void
}
