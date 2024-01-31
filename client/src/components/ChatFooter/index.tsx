import { Button } from '@/components'
import { BsEmojiSmile } from 'react-icons/bs'

import Input from './parts/Input'

const ChatFooter = () => {
  return (
    <div
      id="chat-footer"
      className="flex h-fit w-full items-center justify-between bg-white px-4 py-4"
    >
      <Button className="h-8 w-8">
        <BsEmojiSmile size="1.2rem" color="#686A8A" />
      </Button>
      <Input
        onSubmit={messageData => {
          console.log(messageData)
        }}
      />
    </div>
  )
}

export default ChatFooter
