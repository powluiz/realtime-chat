export interface User {
  id: string
  username: string
  avatar: string
  email: string
  password: string
  createdAt: string
  chatIdList: string[]
}

export interface Contact extends Pick<User, 'id' | 'username' | 'avatar'> {}
