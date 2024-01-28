import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
  IPostRegisterParams,
  IPostRegisterResponse,
  postRegisterFunction,
} from '../services/postRegister'

export const useMutationPostRegister = (
  options?: UseMutationOptions<
    IPostRegisterResponse,
    AxiosError,
    IPostRegisterParams
  >,
) => {
  return useMutation(postRegisterFunction, options)
}
