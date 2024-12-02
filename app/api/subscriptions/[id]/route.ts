import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@infrastructure/middlewares'
import { subscriptionService } from '@ioc/container'

interface Context {
  params: { id: string }
}

const deleteSubscription = async (request: NextRequest, { params }: Context) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  await subscriptionService.delete(id)

  return Response.json({ id }, { status: 200 })
}

const DELETE = createRouteHandler(withAuth, deleteSubscription)

export { DELETE }
