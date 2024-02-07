import { ReactNode } from 'react'

export interface OptionProps {
  name: string
  icon: ReactNode
  action: () => void
}

export interface OptionsBarProps {
  options: OptionProps[]
  className?: string
}
