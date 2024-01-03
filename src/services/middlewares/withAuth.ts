import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const withAuth = async (request: NextRequest) => {
  const token = await getToken({ req: request })

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export default withAuth
