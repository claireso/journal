import { auth } from '@infrastructure/auth'
import { headers } from 'next/headers'
import { UnauthorizedError } from '@domain/errors'

const withAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new UnauthorizedError('User session does not exist')
  }
}

export default withAuth
