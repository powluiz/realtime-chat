import { http } from '../utils/http'

export interface IPostLoginParams {
  email: string
  password: string
}

export interface IPostLoginResponse {
  userId: string
  accessToken?: string
}

export const postLoginFunction = async ({
  email,
  password,
}: IPostLoginParams) => {
  const responseBody = {
    email,
    password,
  }
  const response = await http.post<IPostLoginResponse>(
    `/user/login`,
    responseBody,
  )

  return response.data
}
