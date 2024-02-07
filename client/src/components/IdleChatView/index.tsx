import defaultBackground from '@assets/default_background.jpg'
import { AiOutlineMessage } from 'react-icons/ai'

const IdleChatView = () => {
  return (
    <div
      id="idle-chat-window"
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100"
      style={{
        background: `url(${defaultBackground})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100vh',
      }}
    >
      <AiOutlineMessage size="8rem" className="text-emerald-400" />
      <h1 className="mt-4 select-none text-4xl font-bold text-emerald-400">
        No chat is currently active
      </h1>
      <p className="select-none text-lg text-gray-800 ">
        Select one from the list to start chatting!
      </p>
    </div>
  )
}

export default IdleChatView
