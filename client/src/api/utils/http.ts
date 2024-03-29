import axios, { AxiosInstance } from 'axios'

import { requestInterceptor } from './interceptors'

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HTTP_URL,
})

http.interceptors.request.use(requestInterceptor)
