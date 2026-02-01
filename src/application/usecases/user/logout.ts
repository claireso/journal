'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@infrastructure/auth'

export default async function logout() {
  await auth.api.signOut({
    headers: await headers()
  })
  redirect('/auth/login')
}
