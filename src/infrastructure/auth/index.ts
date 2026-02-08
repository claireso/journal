import { betterAuth } from 'better-auth'
import { credentials } from './plugins/credentials'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  plugins: [
    credentials(),
    nextCookies() // keep last
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // 1 hour
      strategy: 'jwt',
      refreshCache: true,
      version: '1'
    }
  },
  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true
  },
  telemetry: {
    enabled: false
  }
})
