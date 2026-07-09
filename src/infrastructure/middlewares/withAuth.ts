import { headers } from 'next/headers'

import { UnauthorizedError } from '@domain/errors'
import { auth } from '@infrastructure/auth'

const withAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new UnauthorizedError('User session does not exist')
  }
}

export default withAuth
