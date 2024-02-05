import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { IInputMessage, IInputProps } from './types'

const Input = ({ className, onSubmit = () => {} }: IInputProps) => {
  const [messageData, setMessageData] = useState<IInputMessage>({
    text: '',
  })

  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMessageData(previousValue => ({ ...previousValue, text: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onSubmit(messageData)
    setMessageData({ text: '' })
    formRef?.current?.reset()
  }

  return (
    <form ref={formRef} className="w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={handleChange}
        className={twMerge(
          'ease h-8 w-full rounded-full bg-white px-5 py-2 text-sm leading-3 text-neutral-darker outline-none',
          className,
        )}
      />
    </form>
  )
}

export default Input
