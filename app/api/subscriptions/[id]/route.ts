import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@api/middlewares'
import { pool, queries } from '@infrastructure/db'

interface Context {
  params: { id: string }
}

const deleteSubscription = async (request: NextRequest, { params }: Context) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await pool.query(queries.find_subscription(id))
  const subscription = response.rows[0]

  if (subscription === undefined) {
    return Response.json({}, { status: 404 })
  }

  // delete subscription from database
  await pool.query(queries.delete_subscription(id))

  return Response.json({ id }, { status: 200 })
}

const DELETE = createRouteHandler(withAuth, deleteSubscription)

export { DELETE }
