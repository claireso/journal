import logger from '@services/logger'
import type { NextRequest } from 'next/server'
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
        return Response.json({ error: 'Internal server error' }, { status: 500 })
      }
    }
  }
}
