import { ReactNode } from 'react'

export interface IUserProps {
  id: string
  name: string
  avatar: string
  email: string
}

export interface IAuthContextData {
  authenticated: boolean
  loading: boolean
  handleLogin(email: string, password: string): void
  handleLogout(): void
}

export interface IAuthProviderProps {
  children: ReactNode
}
