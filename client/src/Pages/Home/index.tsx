import { ChatView, ChatList, IdleChatView, OptionsBar } from '@/components'
import { ChatItemProps } from '@/components/ChatList/types'
import { FullChatProps } from '@/components/ChatView/types'
import { OptionProps } from '@/components/OptionsBar/types'
import { AuthContext } from '@/contexts/AuthContext'
import { Message, OutgoingMessage } from '@/DTOs/message'
import { mockChats as chats, fullChats } from '@/mocks'
// import { SOCKET_EVENTS } from '@/utils/constants'
// import useWebSockets from '@/hooks/useWebSockets'
import { useContext, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiLogoutBoxLine } from 'react-icons/ri'

const Home = () => {
  // const { isAuthenticated, socket } = useWebSockets()
  const [activeChat, setActiveChat] = useState<FullChatProps | null>({
    id: '1',
    name: 'Nikola Tesla',
    participants: [],
    messages: [],
  })

  // if (isAuthenticated) {
  //   console.log('sending test message')
  //   socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, {
  //     senderId: userId,
  //     chatId: '1',
  //     content: {
  //       text: 'Hello, World!',
  //       image: null,
  //     },
  //   })
  // }

  const handleChangeActiveChat = (chat: ChatItemProps) => {
    const newChat = fullChats.find(c => c.id === chat.id)
    setActiveChat(newChat || null)
  }

  // this simulates incoming messages from the server
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = (message: OutgoingMessage) => {
    const newMessage = {
      id: '0',
      chatId: message.chatId,
      sender: {
        id: '2',
        username: 'John Doe',
        avatar: '',
      },
      content: message.content,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    }

    // simulating server response:

    const currentChat = fullChats.find(c => c.id === message.chatId)
    if (currentChat) {
      currentChat.messages.push(newMessage)
      setMessages([...currentChat.messages])
    }
  }

  const { handleLogout } = useContext(AuthContext)

  const handleChatReturn = () => {
    setActiveChat(null)
  }

  const sidebarOptions: OptionProps[] = [
    {
      name: 'Logout',
      icon: <RiLogoutBoxLine className="text-white" size="1rem" />,
      action: () => handleLogout(),
    },
    {
      name: 'Logout',
      icon: <IoSettingsOutline className="text-white" size="1rem" />,
      action: () => console.log('Settings'),
    },
  ]

  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <div className="flex h-full max-h-svh w-[32rem] max-w-[32rem] flex-col overflow-y-auto pb-9">
        <ChatList
          onSelectChat={chat => handleChangeActiveChat(chat)}
          chats={chats}
        />
        <OptionsBar className="absolute bottom-0" options={sidebarOptions} />
      </div>
      {activeChat ? (
        <ChatView
          {...activeChat}
          messages={messages}
          onSend={handleSendMessage}
          onReturn={handleChatReturn}
        />
      ) : (
        <IdleChatView />
      )}
    </div>
  )
}

export default Home
