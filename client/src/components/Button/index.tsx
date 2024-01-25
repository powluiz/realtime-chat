import { twMerge } from 'tailwind-merge'

import { IButtonProps } from './types'

const Button = ({ children, disabled, className }: IButtonProps) => {
  return (
    <button
      data-disabled={disabled}
      disabled={disabled}
      className={twMerge(
        'flex h-fit w-fit select-none items-center justify-center rounded-full bg-transparent transition-colors duration-200 ease-in-out hover:bg-neutral-lighter active:bg-neutral-base data-[disabled=true]:bg-slate-300',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
