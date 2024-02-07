import { twMerge } from 'tailwind-merge'

import { Button } from '..'

import { OptionsBarProps } from './types'

const OptionsBar = ({ options, className }: OptionsBarProps) => {
  return (
    <div
      className={twMerge(
        'flex h-fit w-fit items-center gap-[0.1875rem] rounded-tr-2xl bg-gray-800 p-2',
        className,
      )}
    >
      {options?.map((option, index) => (
        <Button
          key={`navbar-option-${index}`}
          className="min-h-8 min-w-8 rounded-lg p-2 transition-all duration-300 ease-in-out hover:bg-gray-700 active:bg-gray-600"
          onClick={option.action}
        >
          {option.icon}
        </Button>
      ))}
    </div>
  )
}

export default OptionsBar
