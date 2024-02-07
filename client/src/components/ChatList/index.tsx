import ChatItem from './parts/ChatItem'
import { ChatListProps } from './types'

const ChatList = ({ chats }: ChatListProps) => {
  return (
    <div className="flex h-full w-[32rem] max-w-[32rem] flex-col bg-white py-3">
      <h1 className="select-none px-6 py-4 text-xl font-semibold text-neutral-900">
        Chats
      </h1>
      {chats?.map(chat => (
        <ChatItem
          key={`chat-${chat.id}`}
          onClick={() => console.log(chat.id)}
          {...chat}
        />
      ))}
    </div>
  )
}

export default ChatList
