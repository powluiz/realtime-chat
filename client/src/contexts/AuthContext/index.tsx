import { useMutationPostLogin } from '@/api/hooks/useMutationPostLogin'
import { IPostLoginResponse } from '@/api/services/postLogin'
import { Spinner } from '@/components'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IAuthContextData, IAuthProviderProps } from './types'

export const TOKEN_KEY = 'chatty_client_access_token'
export const USER_KEY = 'chatty_client_user_id'

export const AuthContext = createContext<IAuthContextData>({
  userId: null,
  authenticated: false,
  loading: true,
  handleLogin: () => {},
  handleLogout: () => {},
})

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_KEY)
    const userId = localStorage.getItem(USER_KEY)

    if (!!accessToken && !!userId) {
      setAuthenticated(true)
      setUserId(userId)
    }
    setLoading(false)
  }, [])

  const { mutate: postLogin } = useMutationPostLogin({
    onSuccess: data => {
      handleLoginSuccess(data)
      setLoading(false)
    },
    onError: error => {
      handleLoginError(error)
      setLoading(false)
    },
  })

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    postLogin({ email, password })
  }

  const handleLoginSuccess = (loginData: IPostLoginResponse) => {
    if (!!loginData?.accessToken && !!loginData?.userId) {
      localStorage.setItem(TOKEN_KEY, loginData?.accessToken)
      localStorage.setItem(USER_KEY, loginData?.userId)
      setAuthenticated(true)
      navigate('/')
    }
  }

  const handleLoginError = error => {
    if (error.request.status === 400) {
      alert('Usuário ou senha inválidos.')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    navigate('/login')
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <AuthContext.Provider
      value={{ userId, authenticated, loading, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
