export interface IMessageBubbleProps {
  textualContent?: string
  isCurrentUser: boolean
  timestamp: string
  imageUrl?: string
  isFirstMessageOfGroup: boolean
  onMessageClick?: () => void
  onContextMenu?: () => void
}
