import { redirect } from 'next/navigation'
import { CredentialsSignin, SignInError } from '@auth/core/errors'
import { signIn } from '@infrastructure/auth'
import { getAuthError, AUTH_ERRORS_TYPES } from '@infrastructure/auth/errors'

import LoginForm from '@web/features/user/LoginForm'
import { Heading1 } from '@web/components/Headings'
import Flash from '@web/components/Flash'

import * as cls from './styles.css'

const LoginPage = ({ searchParams }: NextPageProps<{}>) => {
  const { callbackUrl = '/admin/photos', error: errorType } = searchParams

  const error = getAuthError(errorType as AUTH_ERRORS_TYPES)

  const authenticate = async (data: FormData) => {
    'use server'

    try {
      await signIn('credentials', {
        username: data.get('username'),
        password: data.get('password'),
        redirectTo: callbackUrl as string
      })
    } catch (err) {
      if (err instanceof SignInError) {
        const params = new URLSearchParams({
          callbackUrl: callbackUrl as string,
          error: CredentialsSignin.type
        })
        redirect(`?${params}`)
      }
      // throw the next redirect from the signIn
      // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
      throw err
    }
  }

  return (
    <>
      {error && (
        <Flash className={cls.flash} status="error">
          {error.message}
        </Flash>
      )}
      <Heading1 className={cls.heading}>Login</Heading1>
      <LoginForm action={authenticate} />
    </>
  )
}

export default LoginPage
