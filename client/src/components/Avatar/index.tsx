import chatIcon from '@assets/chat-icon.svg'
import { twMerge } from 'tailwind-merge'

import { AvatarProps } from './types'

const Avatar = ({
  src = '',
  alt = '',
  className = '',
  defaultSrc = chatIcon,
}: AvatarProps) => {
  const imageSrc = src || defaultSrc

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={twMerge(
        'pointer-events-none flex aspect-square h-[3.25rem] flex-shrink-0 select-none overflow-hidden rounded-full object-cover',
        className,
      )}
    />
  )
}

export default Avatar
