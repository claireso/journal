const pool = require('../../db/db')
const queries = require('../../db/queries')


module.exports = (req, res, next) => {
  let page = 1

  if (req.params.page !== undefined) {
    page = parseInt(req.params.page, 10)
  }

  pool
    .query(queries.count_photos())
    .then(response => {
      const limit = 10
      const count = response.rows[0].count
      const totalPages = Math.ceil(count / limit)

      if ((count > 0 && page > totalPages || page < 1) || (page > 1 && count == 0)) {
        res.redirect('/')
        return
      }

      res.pager = {
        count,
        totalPages,
        limit,
        offset: (page - 1) * limit,
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
    })
}
