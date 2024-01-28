import { TOKEN_KEY } from '@/contexts/AuthContext'
import { InternalAxiosRequestConfig } from 'axios'

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const accessToken = localStorage.getItem(TOKEN_KEY)

  config.headers = config.headers ?? {}
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  return config
}
