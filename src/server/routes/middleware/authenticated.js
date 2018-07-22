export default (req, res, next) => {
  const user = req.session.passport && req.session.passport.user

  if (!user) {
    res.status(401).send('Unauthorized')
    return
  }

  next()
}