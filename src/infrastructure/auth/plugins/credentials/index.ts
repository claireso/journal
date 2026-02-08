import type { BetterAuthPlugin, User } from 'better-auth'
import { APIError, createAuthEndpoint } from 'better-auth/api'
import { setSessionCookie } from 'better-auth/cookies'
import * as z from 'zod'

import escape from 'lodash/escape'
import { AUTH_ERROR_TYPES } from '@infrastructure/auth/errors'
import { userService } from '@ioc/container'

export const credentials = () =>
  ({
    id: 'credentialsPlugin',
    endpoints: {
      signinWithCredentials: createAuthEndpoint(
        '/signin/credentials',
        {
          method: 'POST',
          body: z.object({
            username: z.string(),
            password: z.string()
          })
        },
        async (ctx) => {
          const username = escape(ctx.body.username as unknown as string)
          const password = escape(ctx.body.password as unknown as string)

          const user = await userService.authenticate(username, password)

          if (!user) {
            throw new APIError(AUTH_ERROR_TYPES.UNAUTHORIZED)
          }

          const sessionUser: User = {
            id: user.cid,
            email: '',
            emailVerified: true,
            name: user.username,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }

          const session = await ctx.context.internalAdapter.createSession(user.cid, false)

          const sessionData = {
            session,
            user: sessionUser
          }

          await setSessionCookie(ctx, sessionData, true)

          return ctx.json({
            token: session.token,
            user: sessionData.user
          })
        }
      )
    }
  }) satisfies BetterAuthPlugin
