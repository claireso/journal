import type { NextAuthOptions } from 'next-auth'

import { CredentialsProvider } from './providers'
import options from './options'

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider],
  ...options
}
