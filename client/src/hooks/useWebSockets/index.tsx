import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SERVER_WS_URL, {
  autoConnect: false,
})

const useWebSockets = () => {
  const { authenticated } = useContext(AuthContext)
  const [isConnected, setIsConnected] = useState(socket.connected)
  // const [fooEvents, setFooEvents] = useState([])

  console.log(isConnected)

  useEffect(() => {
    if (authenticated) {
      socket.connect()
    }

    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    // const onFooEvent = value => {
    //   // setFooEvents(previous => [...previous, value])
    // }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    // socket.on('foo', onFooEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      // socket.off('foo', onFooEvent)
    }
  }, [])
  return { isConnected }
}

export default useWebSockets
