import { Chat } from '@/components'
import { AuthContext } from '@/contexts/AuthContext'
import { SOCKET_EVENTS } from '@/helpers/constants'
import useWebSockets from '@/hooks/useWebSockets'
import { useContext } from 'react'

const Home = () => {
  const { isAuthenticated, socket } = useWebSockets()
  const { userId } = useContext(AuthContext)

  if (isAuthenticated) {
    console.log('sending test message')
    socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, {
      senderId: userId,
      chatId: '1',
      content: {
        text: 'Hello, World!',
        image: null,
      },
    })
  }

  return (
    <div className="h-dvh w-dvw">
      <Chat />
    </div>
  )
}

export default Home
