import { betterAuth } from 'better-auth'
import { credentials } from './plugins/credentials'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  plugins: [
    credentials(),
    nextCookies() // keep last
  ],
  session: {
    expiresIn: 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
      strategy: 'jwt',
      refreshCache: { updateAge: 5 * 60 }, // refresh when less than 5 min remain
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
