import { MessageContent } from '@/DTOs/message'

export interface IInputMessage extends MessageContent {}

export interface IInputProps {
  className?: string
  onSubmit?: (messageData: IInputMessage) => void
}
