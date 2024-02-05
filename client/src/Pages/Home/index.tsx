import { Chat } from '@/components'
import useWebSockets from '@/hooks/useWebSockets'

const Home = () => {
  const { isConnected } = useWebSockets()
  return (
    <div className="h-dvh w-dvw">
      <Chat />
    </div>
  )
}

export default Home
