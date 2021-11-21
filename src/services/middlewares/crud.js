const chainMiddlewares = (req, res, middlewares) =>
  middlewares.reduceRight((prev, current) => {
    return current.bind(null, req, res, prev)
  }, null)

export default (routes) => (req, res) => {
  if (!routes) {
    throw new Error('`routes` must be defined')
  }

  if (typeof routes !== 'object') {
    throw new Error('`routes` must an object')
  }

  const { method } = req
  const middlewares = routes[method]

  if (!middlewares) {
    const allow = Object.keys(routes)
    res.setHeader('Allow', allow)
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  if (!Array.isArray(middlewares)) {
    throw new Error(`Middlewares must be an array of functions`)
  }

  const run = chainMiddlewares(req, res, middlewares)

  run()
}
