import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})
