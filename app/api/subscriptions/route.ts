import { NextRequest } from 'next/server'
import { createRouteHandler, withPagination, withAuth } from '@services/middlewares'
import { pool, queries } from '@services/db'

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
  const { subscription } = await request.json()

  if (!subscription || !subscription.endpoint) {
    return Response.json(
      {
        error: {
          id: 'unprocessable_entity',
          message: 'Subscription is missing or misformed'
        }
      },
      { status: 400 }
    )
  }

  const response = await pool.query(queries.insert_subscription(), [subscription])

  // eslint-disable-next-line no-unused-vars
  const { id, ...newSubscription } = response.rows[0]

  return Response.json(newSubscription, { status: 201 })
}

const GET = createRouteHandler(withAuth, withPagination('subscriptions'), getAllSubscriptions)

const POST = createRouteHandler(createSubscription)

export { GET, POST }
