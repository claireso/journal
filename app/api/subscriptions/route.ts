import { NextRequest } from 'next/server'
import { createRouteHandler } from '@infrastructure/middlewares'
import { subscriptionService } from '@ioc/container'
import { SubscriptionInsertDtoSchema } from '@dto'

//@TODO: improve security of this endpoint
const createSubscription = async (request: NextRequest) => {
  const body = await request.json()

  const result = SubscriptionInsertDtoSchema.parse(body)
  const subscription = await subscriptionService.create(result.subscription)

  return Response.json(subscription, { status: 201 })
}

export const POST = createRouteHandler(createSubscription)
