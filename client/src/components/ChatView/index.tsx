import { Message, MessageContent } from '@/DTOs/message'
import defaultBackground from '@assets/default_background.jpg'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuChevronLeft } from 'react-icons/lu'

import { Button, ChatFooter, MessageBubble } from '..'

import { FullChatProps } from './types'

const ChatView = ({
  id: chatId,
  name: chatName = 'Chat',
  participants: chatParticipants,
  onSend = () => {},
  onReturn = () => {},
}: FullChatProps) => {
  const backgroundImage = defaultBackground
  const chatInfo = useMemo(() => {
    return chatParticipants?.length > 2
      ? `${chatParticipants?.length} participants`
      : 'Chat Individual'
  }, [])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      chatId,
      sender: {
        id: '1',
        username: 'John Doe',
        avatar: '',
      },
      content: {
        text: 'Hey!',
      },
      timestamp: '12:00',
    },
    {
      id: '1',
      chatId,
      sender: {
        id: '1',
        username: 'Marie Curie',
        avatar: '',
      },
      content: {
        text: "I'm here!",
      },
      timestamp: '12:02',
    },
    {
      id: '2',
      chatId,
      sender: {
        id: '1',
        username: 'John Doe',
        avatar: '',
      },
      content: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      timestamp: '12:00',
    },
    {
      id: '3',
      chatId,
      sender: {
        id: '2',
        username: 'Marie Curie',
        avatar: '',
      },
      content: {
        text: 'Hey!',
      },
      timestamp: '12:02',
    },
    {
      id: '4',
      chatId,
      sender: {
        id: '2',
        username: 'Marie Curie',
        avatar: '',
      },
      content: {
        text: 'what do you think about this picture??',
        image:
          'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      },
      timestamp: '12:02',
    },
  ])

  const handleSendMessage = (messageData: MessageContent) => {
    setMessages(previousMessages => [
      ...previousMessages,
      {
        id: '0',
        chatId: '1',
        sender: {
          id: '2',
          username: 'John Doe',
          avatar: '',
        },
        content: messageData,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
      },
    ])
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
  }, [messages])

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
        className="chat-content-wrapper flex w-full flex-1 justify-center overflow-auto bg-gray-100"
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
          {messages?.map((message, index) => {
            const messageSender = message?.sender?.id
            const pastMessageSender = messages?.[index - 1]?.sender?.id
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
