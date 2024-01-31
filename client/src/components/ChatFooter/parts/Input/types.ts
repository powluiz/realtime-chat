export interface IInputMessage {
  text: string
}

export interface IInputProps {
  className?: string
  onSubmit?: (messageData: IInputMessage) => void
}
