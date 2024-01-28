import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
  IPostLoginParams,
  IPostLoginResponse,
  postLoginFunction,
} from '../services/postLogin'

export const useMutationPostLogin = (
  options?: UseMutationOptions<
    IPostLoginResponse,
    AxiosError,
    IPostLoginParams
  >,
) => {
  return useMutation(postLoginFunction, options)
}
