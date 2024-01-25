import { Button } from '@/components'
import defaultBackground from '@assets/default_background_green.jpg'
import { FormikValues, useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const Login = () => {
  const backgroundImage = defaultBackground

  const navigate = useNavigate()

  const handleSubmit = (values: FormikValues) => {
    console.log(values)
    navigate('/')
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  })

  const isButtonDisabled =
    !formik?.dirty ||
    Object.keys(formik?.errors).length > 0 ||
    formik?.isSubmitting

  return (
    <div
      className="flex h-dvh w-dvw items-center justify-center bg-gray-100 p-10"
      style={
        backgroundImage
          ? {
              background: `url(${backgroundImage})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '80vh',
            }
          : {}
      }
    >
      <form
        onSubmit={formik?.handleSubmit}
        noValidate
        className="flex w-full max-w-[32rem] flex-col justify-center gap-4 rounded-xl bg-white p-6 py-8 drop-shadow-md"
      >
        <div className="mb-4 flex flex-col gap-1">
          <h1 className="text-center text-3xl font-extrabold text-emerald-500">
            Login to Your Account
          </h1>
          <h1 className="text-center text-base font-medium text-slate-600">
            Complete the fields below to login
          </h1>
        </div>

        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="email"
            data-error={formik?.touched?.email && formik?.errors?.email}
            className="form-label data-[error]:text-error-base"
          >
            Email Address
          </label>
          <input
            data-error={formik?.touched?.email && formik?.errors?.email}
            className="form-input data-[error]:ring-1 data-[error]:ring-error-base"
            id="email"
            name="email"
            placeholder="Enter your email address"
            type="email"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.email}
          />
          {formik?.touched?.email && formik?.errors?.email && (
            <h3 className="form-error">Enter a valid email address</h3>
          )}
        </div>

        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="password"
            data-error={formik?.touched?.password && formik?.errors?.password}
            className="form-label data-[error]:text-error-base"
          >
            Password
          </label>
          <input
            data-error={formik?.touched?.password && formik?.errors?.password}
            className="form-input data-[error]:ring-1 data-[error]:ring-error-base"
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.password}
          />
        </div>
        <Button
          type="submit"
          className="mt-3 w-full rounded-lg bg-emerald-500 px-8 py-3 text-white hover:bg-emerald-700 active:bg-emerald-600 data-[disabled=true]:bg-emerald-100"
          disabled={isButtonDisabled}
        >
          <h3 className="text-base">Login</h3>
        </Button>

        <div className="mt-6 flex flex-col gap-3">
          <h1 className="text-center text-sm font-medium text-slate-600">
            {"Don't have an account yet?"}
          </h1>
          <Link to="/register">
            <Button
              type="button"
              onClick={() => {}}
              className="w-full rounded-lg bg-slate-300 px-8 py-3 text-white hover:bg-emerald-700 active:bg-emerald-600"
            >
              <h3 className="text-base text-white">Go to Register Page</h3>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
