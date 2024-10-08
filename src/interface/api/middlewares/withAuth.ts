import type { NextRequest } from 'next/server'
import { auth } from '@infrastructure/auth'

const withAuth = async (request: NextRequest) => {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export default withAuth
