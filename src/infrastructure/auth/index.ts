import NextAuth from 'next-auth'
import { CredentialsProvider } from './providers'
import authConfig from './config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [CredentialsProvider]
})
