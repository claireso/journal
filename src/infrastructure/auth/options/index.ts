import type { NextAuthOptions } from 'next-auth'

const options: Partial<NextAuthOptions> = {
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60 * 60 // 1hour
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  }
}

export default options
