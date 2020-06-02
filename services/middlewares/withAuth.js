import withPassport from './withPassport'

const withAuth = (req, res, next) => {
  const user = req.session?.passport?.user

  if (!user) {
    res.status(401).send('Unauthorized')
    return
  }

  next()
}

export default (req, res, next) => {
  withPassport(req, res, () => {
    withAuth(req, res, next)
  })
}
