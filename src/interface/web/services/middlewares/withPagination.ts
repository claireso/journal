import { NextRequest } from 'next/server'
import { pool, queries } from '@web/services/db'
import { Pager } from '@models'

const withPagination = (resource: string) => async (request: NextRequest & { pager: Pager }) => {
  const { searchParams } = new URL(request.url)
  let page = searchParams.get('page') as string | number

  page = Number(page)

  if (isNaN(page)) {
    page = 1
  }

  const response = await pool.query(queries.count(resource))
  const limit = 10
  const count = Number(response.rows[0].count)
  const totalPages = Math.ceil(count / limit)

  if ((count > 0 && page > totalPages) || page < 1 || (page > 1 && count == 0)) {
    return Response.json({}, { status: 404 })
  }

  request.pager = {
    count,
    totalPages,
    limit,
    offset: (page - 1) * limit
  }

  if (page > 1) {
    request.pager.prev = page - 1
    request.pager.first = 1
  }

  if (page < totalPages) {
    request.pager.next = page + 1
    request.pager.last = totalPages
  }
}

export default withPagination
