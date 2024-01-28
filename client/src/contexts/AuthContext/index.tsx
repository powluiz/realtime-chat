import { useMutationPostLogin } from '@/api/hooks/useMutationPostLogin'
import { IPostLoginResponse } from '@/api/services/postLogin'
import { Spinner } from '@/components'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IAuthContextData, IAuthProviderProps } from './types'

export const TOKEN_KEY = 'accessToken'

export const AuthContext = createContext<IAuthContextData>({
  authenticated: false,
  loading: true,
  handleLogin: () => {},
  handleLogout: () => {},
})

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_KEY)
    if (accessToken !== null) {
      setAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const { mutate: postLogin } = useMutationPostLogin({
    onSuccess: data => {
      handleLoginSuccess(data)
      setLoading(false)
    },
    onError: () => {
      // TODO: error toast
      setLoading(false)
    },
  })

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    postLogin({ email, password })
  }

  const handleLoginSuccess = (loginData: IPostLoginResponse) => {
    if (loginData?.accessToken) {
      setAuthenticated(true)
      localStorage.setItem(TOKEN_KEY, loginData?.accessToken)
      navigate('/')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem(TOKEN_KEY)
    navigate('/login')
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
