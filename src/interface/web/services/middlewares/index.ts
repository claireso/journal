import { ZodError } from 'zod'
import type { NextRequest } from 'next/server'
import logger from '@infrastructure/logger'
export { default as withPagination } from './withPagination'
export { default as withAuth } from './withAuth'

export const createRouteHandler = (...middlewares: any[]) => {
  return async (request: NextRequest, context: any) => {
    for (const middleware of middlewares) {
      try {
        const response = await middleware(request, context)
        if (response) {
          return response
        }
      } catch (err) {
        logger.error(err)
        if (err instanceof ZodError) {
          return Response.json(err.format(), { status: 422 })
        }
        return Response.json({ error: 'Internal server error' }, { status: 500 })
      }
    }
  }
}
