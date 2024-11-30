'use server'

import { redirect } from 'next/navigation'
import { CredentialsSignin, SignInError } from '@auth/core/errors'
import { signIn } from '@infrastructure/auth'

export default async function login(callbackUrl: string, data: FormData) {
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
