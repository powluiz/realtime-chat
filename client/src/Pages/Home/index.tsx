import { Chat, ChatList } from '@/components'
import { FullChatProps } from '@/components/Chat/types'
import { ChatItemProps } from '@/components/ChatList/types'
// import { SOCKET_EVENTS } from '@/helpers/constants'
// import useWebSockets from '@/hooks/useWebSockets'
import { useState } from 'react'

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
]

const Home = () => {
  // const { isAuthenticated, socket } = useWebSockets()
  const [activeChat] = useState<FullChatProps>({
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

  return (
    <div className="flex h-dvh w-full">
      <ChatList chats={chats} />
      <Chat {...activeChat} />
    </div>
  )
}

export default Home
