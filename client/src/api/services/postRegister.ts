import { http } from '../utils/http'

export interface IPostRegisterParams {
  name: string
  email: string
  password: string
}

export interface IPostRegisterResponse {
  id: string
  name: string
  email: string
}

export const postRegisterFunction = async ({
  name,
  email,
  password,
}: IPostRegisterParams) => {
  const responseBody = {
    name,
    email,
    password,
  }

  const response = await http.post<IPostRegisterResponse>(
    `/user/register`,
    responseBody,
  )

  return response.data
}
