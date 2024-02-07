import { twMerge } from 'tailwind-merge'

import { AvatarProps } from './types'

const Avatar = ({ src = '', alt = '', className }: AvatarProps) => {
  return (
    !!src && (
      <img
        className={twMerge(
          'pointer-events-none flex aspect-square h-[3.25rem] flex-shrink-0 select-none overflow-hidden rounded-full object-cover',
          className,
        )}
        src={src}
        alt={alt}
      />
    )
  )
}

export default Avatar
