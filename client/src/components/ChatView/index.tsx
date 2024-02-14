import { MessageContent } from '@/DTOs/message'
import defaultBackground from '@assets/default_background.jpg'
import { useEffect, useMemo, useRef } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuChevronLeft } from 'react-icons/lu'

import { Avatar, Button, ChatFooter, MessageBubble } from '..'

import { FullChatProps } from './types'

const ChatView = ({
  id: chatId,
  name: chatName = 'Chat',
  participants: chatParticipants,
  image: chatImage = '',
  messages: chatMessages,
  onSend = () => {},
  onReturn = () => {},
}: FullChatProps) => {
  const backgroundImage = defaultBackground

  const chatInfo = useMemo(() => {
    return chatParticipants?.length > 2
      ? `${chatParticipants?.length} participants`
      : 'Chat Individual'
  }, [])

  const handleSendMessage = (messageData: MessageContent) => {
    onSend({
      chatId,
      content: messageData,
    })
  }

  const chatContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const autoScrollChat = (element: HTMLDivElement) => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      })
    }
    if (chatContentRef.current) {
      autoScrollChat(chatContentRef.current)
    }
  }, [chatMessages])

  return (
    <div id="chat-window" className="flex h-full w-full flex-col">
      <div
        id="chat-header"
        className="flex h-fit w-full flex-row items-center justify-between bg-white px-3 py-4 drop-shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Button className="min-h-8 min-w-8" onClick={onReturn}>
            <LuChevronLeft color="#686A8A" />
          </Button>
          <Avatar src={chatImage} alt="chat-image" />
          <div className="flex select-none flex-col gap-1">
            <h2 className="text-base font-medium leading-4 text-neutral-darker">
              {chatName}
            </h2>
            <h3 className="text-sm leading-3 text-neutral-dark">{chatInfo}</h3>
          </div>
        </div>
        <Button className="min-h-8 min-w-8">
          <BsThreeDotsVertical color="#686A8A" />
        </Button>
      </div>

      <div
        ref={chatContentRef}
        className="darkerScrollbar chat-content-wrapper flex w-full flex-1 justify-center overflow-auto bg-gray-100"
        style={
          backgroundImage
            ? {
                background: `url(${backgroundImage})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '100vh',
              }
            : undefined
        }
      >
        <div
          id="chat-content"
          className="flex h-fit w-full max-w-[62rem] flex-col px-4 py-6"
        >
          {chatMessages?.map((message, index) => {
            const messageSender = message?.sender?.id
            const pastMessageSender = chatMessages?.[index - 1]?.sender?.id
            const isFirstMessageOfGroup =
              index !== 0 && messageSender !== pastMessageSender

            return (
              <MessageBubble
                key={message?.id}
                content={message?.content}
                sender={message?.sender}
                timestamp={message?.timestamp}
                isFirstMessageOfGroup={isFirstMessageOfGroup}
              />
            )
          })}
        </div>
      </div>

      <ChatFooter onSend={messageData => handleSendMessage(messageData)} />
    </div>
  )
}

export default ChatView
