import { login } from '@application/usecases'
import { getAuthError, AUTH_ERRORS_TYPES } from '@infrastructure/auth/errors'

import LoginForm from '@web/features/user/LoginForm'
import { Heading1 } from '@web/components/Headings'
import Flash from '@web/components/Flash'

import * as cls from './styles.css'

const LoginPage = async ({ searchParams }: NextPageProps<{}>) => {
  const { callbackUrl = '/admin/photos', error: errorType } = await searchParams

  const loginWithCallbackUrlAction = login.bind(null, callbackUrl as string)
  const error = getAuthError(errorType as AUTH_ERRORS_TYPES)

  return (
    <>
      {error && (
        <Flash className={cls.flash} status="error">
          {error.message}
        </Flash>
      )}
      <Heading1 className={cls.heading}>Login</Heading1>
      <LoginForm action={loginWithCallbackUrlAction} />
    </>
  )
}

export default LoginPage
