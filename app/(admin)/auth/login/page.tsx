'use client'
import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Heading1 } from '@web/components/Headings'
import Flash from '@web/components/Flash'

import { getAuthError, AUTH_ERRORS_TYPES } from '@web/services/auth/errors'
import LoginForm from '@web/features/user/LoginForm'

const LoginPage = () => {
  const searchParams = useSearchParams()
  const errorType = searchParams?.get('error') as AUTH_ERRORS_TYPES
  const callbackUrl = searchParams?.get('callbackUrl')

  const error = getAuthError(errorType)

  const onSignIn = useCallback(
    (data: { username: string; password: string }) => {
      signIn('credentials', { ...data, callbackUrl: callbackUrl ?? '/admin/photos' })
    },
    [callbackUrl]
  )

  return (
    <>
      {error && (
        <Flash status="error" css={{ margin: 0, position: 'fixed', top: 0, left: 0, width: '100%' }}>
          {error.message}
        </Flash>
      )}
      <Heading1>Login</Heading1>
      <LoginForm onSubmit={onSignIn} />
    </>
  )
}

export default LoginPage
