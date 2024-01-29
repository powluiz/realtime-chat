import { AuthContext } from '@/contexts/AuthContext'
import defaultBackground from '@assets/default_background.jpg'
import { useContext, useEffect, useRef } from 'react'
import { BsEmojiSmile, BsThreeDotsVertical } from 'react-icons/bs'
import { LuChevronLeft } from 'react-icons/lu'

import { Button, MessageBubble } from '..'

const Chat = () => {
  const { handleLogout } = useContext(AuthContext)
  const backgroundImage = defaultBackground
  const messages = [
    {
      id: 1,
      isCurrentUser: false,
      timestamp: '12:00',
      imageUrl:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 2,
      textualContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isCurrentUser: false,
      timestamp: '12:00',
      imageUrl:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 3,
      textualContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isCurrentUser: true,
      timestamp: '12:00',
    },
    {
      id: 4,
      textualContent: 'Lorem ipsum dolor sit amet',
      isCurrentUser: true,
      timestamp: '12:00',
    },
  ]

  const chatContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setScrollPosition = (element: HTMLDivElement) => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      })
    }

    if (chatContentRef.current) {
      setScrollPosition(chatContentRef.current)
    }
  }, [])

  return (
    <div id="chat-window" className="flex h-full flex-col">
      <div
        id="chat-header"
        className="flex h-fit w-full flex-row items-center justify-between bg-white px-3 py-4 drop-shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Button className="min-h-8 min-w-8" onClick={() => handleLogout()}>
            <LuChevronLeft color="#686A8A" />
          </Button>
          <div className="flex select-none flex-col gap-1">
            <h2 className="text-base font-medium leading-4 text-neutral-darker">
              Nome do Grupo
            </h2>
            <h3 className="text-sm leading-3 text-neutral-dark">
              Info adicional
            </h3>
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
            : {}
        }
      >
        <div
          id="chat-content"
          className="flex h-fit w-full max-w-[62rem] flex-col px-4 py-6"
        >
          {messages?.map((message, index) => (
            <MessageBubble
              key={message.id}
              textualContent={message?.textualContent}
              isCurrentUser={message?.isCurrentUser}
              timestamp={message?.timestamp}
              imageUrl={message?.imageUrl}
              isFirstMessageOfGroup={
                index !== 0 &&
                messages?.[index - 1].isCurrentUser !== message.isCurrentUser
              }
            />
          ))}
        </div>
      </div>

      <div id="chat-footer" className="flex h-fit w-full bg-white px-4 py-4">
        <Button className="h-8 w-8">
          <BsEmojiSmile size="1.2rem" color="#686A8A" />
        </Button>
      </div>
    </div>
  )
}

export default Chat
