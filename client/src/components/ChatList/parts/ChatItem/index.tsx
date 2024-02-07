import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { ChatItemProps } from '../../types'

const ChatItem = ({
  image,
  lastMessage,
  name,
  participants,
  onClick,
  className,
}: ChatItemProps) => {
  const { userId } = useContext(AuthContext)

  const lastSender = useMemo(() => {
    if (lastMessage?.senderId === userId) {
      return 'You'
    } else if (participants.length > 2) {
      return lastMessage?.senderName
    }
    return null
  }, [lastMessage])

  const messageToDisplay = useMemo(() => {
    return lastSender
      ? `${lastSender}: ${lastMessage?.content?.text}`
      : lastMessage?.content?.text
  }, [lastSender])

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-start gap-4 border-b-[1px] border-solid border-neutral-300 bg-white px-6 py-4 hover:bg-neutral-100 active:bg-neutral-200',
        className,
      )}
      onClick={onClick}
    >
      {!!image && (
        <img
          className="pointer-events-none flex aspect-square h-[3.25rem] flex-shrink-0 select-none overflow-hidden rounded-full object-cover"
          src={image}
          alt="chat-image"
        />
      )}

      <div className="flex w-full flex-col">
        <h2 className="select-none text-base font-semibold text-neutral-900">
          {name}
        </h2>
        <div className="flex w-full justify-between">
          <p className="select-none text-sm font-medium text-neutral-400">
            {messageToDisplay}
          </p>
          <p className="font-base select-none text-xs text-neutral-400">
            {lastMessage.timestamp}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
