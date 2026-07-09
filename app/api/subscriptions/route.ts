import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

import { SubscriptionInsertDtoSchema } from '@dto'
import { createRouteHandler } from '@infrastructure/middlewares'
import { subscriptionService } from '@ioc/container'

//@TODO: improve security of this endpoint
const createSubscription = async (request: NextRequest) => {
  const body = await request.json()

  const result = SubscriptionInsertDtoSchema.parse(body)
  const subscription = await subscriptionService.create(result.subscription)

  revalidatePath('/admin/subscriptions')

  return Response.json(subscription, { status: 201 })
}

export const POST = createRouteHandler(createSubscription)
