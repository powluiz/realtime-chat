import { ChatView, ChatList, IdleChatView, OptionsBar } from '@/components'
import { ChatItemProps } from '@/components/ChatList/types'
import { FullChatProps } from '@/components/ChatView/types'
import { OptionProps } from '@/components/OptionsBar/types'
import { AuthContext } from '@/contexts/AuthContext'
// import { SOCKET_EVENTS } from '@/helpers/constants'
// import useWebSockets from '@/hooks/useWebSockets'
import { useContext, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiLogoutBoxLine } from 'react-icons/ri'

const chats: ChatItemProps[] = [
  {
    id: '1',
    name: 'Nikola Tesla',
    image:
      'https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Nikola Tesla',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
  {
    id: '2',
    name: 'Marie Curie',
    image:
      'https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Marie Curie',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
  {
    id: '3',
    name: 'Albert Einstein',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcpGPvLASQo5V70o1NFNd2PkS3QhdOOx_YugJSXbkOcQ&s',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Marie Curie',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
  {
    id: '3',
    name: 'Albert Einstein',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcpGPvLASQo5V70o1NFNd2PkS3QhdOOx_YugJSXbkOcQ&s',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Marie Curie',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
  {
    id: '3',
    name: 'Albert Einstein',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcpGPvLASQo5V70o1NFNd2PkS3QhdOOx_YugJSXbkOcQ&s',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Marie Curie',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
  {
    id: '3',
    name: 'Albert Einstein',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcpGPvLASQo5V70o1NFNd2PkS3QhdOOx_YugJSXbkOcQ&s',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Marie Curie',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
  {
    id: '3',
    name: 'Albert Einstein',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcpGPvLASQo5V70o1NFNd2PkS3QhdOOx_YugJSXbkOcQ&s',
    participants: [],
    lastMessage: {
      senderId: '1',
      senderName: 'Marie Curie',
      timestamp: '20:35',
      content: {
        text: 'Hello, World!',
      },
    },
  },
]

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
          onSelectChat={chat => {
            setActiveChat(chat) // conferir lógica para obter mensagens daquele chat e setat no activeChat
            console.log(chat)
          }}
          chats={chats}
        />
        <OptionsBar className="absolute bottom-0" options={sidebarOptions} />
      </div>
      {activeChat ? (
        <ChatView
          onSend={data => console.log(data)}
          onReturn={handleChatReturn}
          {...activeChat}
        />
      ) : (
        <IdleChatView />
      )}
    </div>
  )
}

export default Home
