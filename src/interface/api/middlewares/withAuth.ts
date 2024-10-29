import type { NextRequest } from 'next/server'
import { auth } from '@infrastructure/auth'
import { redirect } from 'next/navigation'

const withAuth = async (request?: NextRequest) => {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }
}

export default withAuth
