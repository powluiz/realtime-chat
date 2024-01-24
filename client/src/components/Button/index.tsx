import { twMerge } from 'tailwind-merge'

import { IButtonProps } from './types'

const Button = ({ children, className }: IButtonProps) => {
  return (
    <div
      className={twMerge(
        'hover:bg-neutral-lighter active:bg-neutral-base flex h-fit w-fit cursor-pointer items-center justify-center rounded-full bg-transparent transition-colors duration-200 ease-in-out',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Button
