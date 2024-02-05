import { MessageContent } from '@/DTOs/message'
import { Contact } from '@/DTOs/user'

export interface IMessageBubbleProps {
  content: MessageContent
  sender: Contact
  timestamp: string
  isFirstMessageOfGroup: boolean
  onMessageClick?: () => void
  onContextMenu?: () => void
}
