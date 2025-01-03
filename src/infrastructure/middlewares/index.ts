import { ZodError } from 'zod'
import type { NextRequest } from 'next/server'
import { JournalError, BadRequestError, NotFoundError, UnauthorizedError } from '@domain/errors/errors'
import logger from '@infrastructure/logger'

export { default as withAuth } from './withAuth'

// eslint-disable-next-line
export const createRouteHandler = (...middlewares: any[]) => {
  // eslint-disable-next-line
  return async (request: NextRequest, context: any) => {
    for (const middleware of middlewares) {
      try {
        const response = await middleware(request, context)
        if (response) {
          return response
        }
      } catch (err) {
        if (err instanceof ZodError) {
          logger.warn({ err, ctx: err.cause })
          return Response.json(err.format(), { status: 422 })
        }

        if (err instanceof JournalError) {
          if (err instanceof BadRequestError) {
            logger.warn({ err, ctx: err.cause })
            return Response.json({ message: err.message }, { status: 400 })
          }
          if (err instanceof NotFoundError) {
            logger.warn({ err, ctx: err.cause })
            return Response.json({ message: err.message }, { status: 404 })
          }

          if (err instanceof UnauthorizedError) {
            logger.warn({ err, ctx: err.cause })
            return Response.json({ message: err.message }, { status: 401 })
          }
        }
        logger.error(err)
        return Response.json({ error: 'Internal server error' }, { status: 500 })
      }
    }
  }
}
