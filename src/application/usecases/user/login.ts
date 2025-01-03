'use server'

import { redirect } from 'next/navigation'
import { CredentialsSignin, SignInError } from '@auth/core/errors'
import { signIn } from '@infrastructure/auth'
import logger from '@infrastructure/logger'

export default async function login(callbackUrl: string, data: FormData) {
  try {
    await signIn('credentials', {
      username: data.get('username'),
      password: data.get('password'),
      redirectTo: callbackUrl as string
    })
  } catch (err) {
    if (err instanceof SignInError) {
      const searchParams = new URLSearchParams({
        callbackUrl: callbackUrl as string,
        error: CredentialsSignin.type
      })
      redirect(`/auth/login?${searchParams.toString()}`)
    }
    // throw the next redirect from the signIn
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    logger.error(err, 'Could not sign in user')
    throw err
  }
}
