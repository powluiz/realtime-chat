import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

import { IMessageBubbleProps } from './types'

const Message = ({
  content,
  sender,
  // timestamp,
  onMessageClick,
  onContextMenu,
  isFirstMessageOfGroup,
}: IMessageBubbleProps) => {
  const { userId } = useContext(AuthContext)
  const isCurrentUser = sender?.id === userId

  return (
    <div
      data-current-user={isCurrentUser}
      data-first-group-message={isFirstMessageOfGroup}
      className="mt-1 flex w-full justify-start data-[first-group-message=true]:mt-5 data-[current-user=true]:justify-end"
    >
      <div
        data-current-user={isCurrentUser}
        className="relative flex w-fit max-w-[24rem] gap-[0.125rem] rounded-xl bg-white p-3 shadow-sm data-[current-user=false]:rounded-tl-none data-[current-user=true]:rounded-tr-none data-[current-user=true]:bg-primary-light"
        onClick={onMessageClick}
        onContextMenu={onContextMenu}
      >
        <div id="message-content" className="flex flex-1 flex-col">
          {content?.image && (
            <img
              src={content?.image}
              data-has-text={!!content?.text}
              alt="message-img"
              className="h-48 w-full select-none rounded-md object-cover data-[has-text=true]:mb-3"
            />
          )}
          <p className="text-sm font-normal text-neutral-darker">
            {content?.text}
          </p>
        </div>

        {/* TODO: Corrigir horário da mensagem em casos sem texto */}
        {/* <div className="absolute bottom-[0.5rem] right-[0.5rem] flex h-fit w-fit items-end justify-center">
          <p className="select-none text-[0.625rem] text-neutral-dark">
            {timestamp}
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default Message
