import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@api/middlewares'
import { subscriptionService } from '@ioc/container'
import { SubscriptionInsertDtoSchema } from '@dto'

const getPaginatedSubscriptions = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  let page = searchParams.get('page') as string | number

  page = Number(page)

  if (isNaN(page) || page < 0) {
    return Response.json({}, { status: 400 })
  }

  const paginatedSubscriptions = await subscriptionService.getPaginatedSubscriptions(page ?? 1)

  return Response.json(paginatedSubscriptions, { status: 200 })
}

//@TODO: improve security of this endpoint
const createSubscription = async (request: NextRequest) => {
  const body = await request.json()

  const result = SubscriptionInsertDtoSchema.parse(body)
  const subscription = await subscriptionService.create(result.subscription)

  return Response.json(subscription, { status: 201 })
}

export const GET = createRouteHandler(withAuth, getPaginatedSubscriptions)
export const POST = createRouteHandler(createSubscription)
