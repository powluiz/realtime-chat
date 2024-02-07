import { Chat } from '@/DTOs/chat'
import { MessageContent } from '@/DTOs/message'

export interface ChatItemProps extends Omit<Chat, 'messages'> {
  lastMessage: {
    senderId: string
    senderName: string
    content: MessageContent
    timestamp: string
  }
  className?: string
  onClick?: () => void
}

export interface ChatListProps {
  chats: ChatItemProps[]
  selectedChat?: ChatItemProps
  onSelectChat?: (chat: ChatItemProps) => void
}
