import { AuthContext } from '@/contexts/AuthContext'
import { SOCKET_EVENTS } from '@/helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SERVER_WS_URL, {
  autoConnect: false,
})

const useWebSockets = () => {
  const { userId } = useContext(AuthContext)
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    if (userId) {
      socket.connect()
    }

    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setIsAuthenticated(false)
      console.log('Websocket disconnected.')
    }

    socket.on(SOCKET_EVENTS.CONNECT, onConnect)
    socket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect)

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, onConnect)
      socket.off(SOCKET_EVENTS.DISCONNECT, onDisconnect)
    }
  }, [])

  useEffect(() => {
    if (isConnected && !isAuthenticated) {
      socket
        .emit(SOCKET_EVENTS.CLIENT_RECOGNITION, {
          userId,
        })
        .once(SOCKET_EVENTS.CLIENT_RECOGNITION_CONFIRM, () => {
          console.log('Websocket connection established.')
          setIsAuthenticated(true)
        })
    }
  }, [isConnected])

  return { isAuthenticated, socket }
}

export default useWebSockets
