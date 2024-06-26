import { NextRequest } from 'next/server'
import { createRouteHandler, withPagination, withAuth } from '@services/middlewares'
import { pool, queries } from '@services/db'
import { Pager, Subscription, SubscriptionSchema } from '@models'

const getAllSubscriptions = async (request: NextRequest & { pager: Pager }) => {
  const response = await pool.query(
    queries.get_subscriptions({
      options: `OFFSET ${request.pager.offset} LIMIT ${request.pager.limit}`
    })
  )

  return Response.json(
    {
      items: response.rows,
      pager: request.pager
    },
    { status: 200 }
  )
}

//@TODO: improve security of this endpoint
const createSubscription = async (request: NextRequest) => {
  const body = await request.json()

  const result = SubscriptionSchema.pick({ subscription: true }).parse(body)

  const response = await pool.query(queries.insert_subscription(), [result.subscription])

  const { id, ...newSubscription }: Subscription = response.rows[0]

  return Response.json(newSubscription, { status: 201 })
}

export const GET = createRouteHandler(withAuth, withPagination('subscriptions'), getAllSubscriptions)
export const POST = createRouteHandler(createSubscription)
