import pool from '@server/db/db'
import queries from '@server/db/queries'

export default resourceName => async (req, res, next) => {
  let page = 1

  if (req.query.page !== undefined) {
    page = Number(req.query.page)
  }

  const response = await pool.query(queries.count(resourceName))
  const limit = 10
  const count = Number(response.rows[0].count)
  const totalPages = Math.ceil(count / limit)

  if (
    (count > 0 && page > totalPages) ||
    page < 1 ||
    (page > 1 && count == 0)
  ) {
    res.status(404).json()
    return
  }

  res.pager = {
    count,
    totalPages,
    limit,
    offset: (page - 1) * limit
  }

  if (page > 1) {
    res.pager.prev = page - 1
    res.pager.first = 1
  }

  if (page < totalPages) {
    res.pager.next = page + 1
    res.pager.last = totalPages
  }

  next()
}
