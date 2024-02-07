import ChatItem from './parts/ChatItem'
import { ChatListProps } from './types'

const ChatList = ({ onSelectChat = () => {}, chats }: ChatListProps) => {
  return (
    <div className="flex flex-1 flex-col bg-white py-3">
      <h1 className="select-none px-6 py-4 text-xl font-semibold text-gray-900">
        Chats
      </h1>
      {chats?.map(chat => (
        <ChatItem
          key={`chat-${chat.id}`}
          className="border-b-[1px] border-solid border-gray-200 last:border-b-0"
          onClick={() => {
            onSelectChat(chat)
          }}
          {...chat}
        />
      ))}
    </div>
  )
}

export default ChatList
