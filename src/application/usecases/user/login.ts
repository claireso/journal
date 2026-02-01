'use server'

import { auth } from '@infrastructure/auth'

import { redirect } from 'next/navigation'
import { APIError } from 'better-auth/api'

export default async function login(callbackUrl: string, data: FormData) {
  try {
    await auth.api.signinWithCredentials({
      body: {
        username: data.get('username') as string,
        password: data.get('password') as string
      }
    })
    redirect(callbackUrl)
  } catch (err) {
    if (err instanceof APIError) {
      const searchParams = new URLSearchParams({
        callbackUrl: callbackUrl as string,
        error: err.status as string
      })
      redirect(`/auth/login?${searchParams.toString()}`)
    }
    // throw the next redirect from the signIn
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw err
  }
}
