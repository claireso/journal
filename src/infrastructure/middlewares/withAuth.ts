import { auth } from '@infrastructure/auth'
import { UnauthorizedError } from '@domain/errors'

const withAuth = async () => {
  const session = await auth()

  if (!session) {
    throw new UnauthorizedError('User session does not exist')
  }
}

export default withAuth
