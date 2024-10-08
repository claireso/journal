import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [], /// will be overriden in the main export
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
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    }
  }
} satisfies NextAuthConfig
