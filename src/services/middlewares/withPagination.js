import { pool, queries } from '@services/db'

export default (resource) => async (req, res, next) => {
  let {
    query: { page }
  } = req

  // cast query into number
  page = Number(page)

  if (isNaN(page)) {
    page = 1
  }

  //@TODO try catch
  const response = await pool.query(queries.count(resource))
  const limit = 10
  const count = Number(response.rows[0].count)
  const totalPages = Math.ceil(count / limit)

  if ((count > 0 && page > totalPages) || page < 1 || (page > 1 && count == 0)) {
    return res.status(404).end()
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
