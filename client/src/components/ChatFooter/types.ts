import { MessageContent } from '@/DTOs/message'

export interface ChatFooterProps {
  onSend: (messageData: MessageContent) => void
}
