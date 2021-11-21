import crud from '@services/middlewares/crud'
import withPassport, { passport } from '@services/middlewares/withPassport'

const authenticate = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(422).json({
      message: 'Bad username or password'
    })
    return
  }

  // @TODO: https://github.com/zeit/next.js/issues/10439
  passport.authenticate('local')(req, res, () => {
    res.status(200).json({})
  })
}

export default crud({
  POST: [withPassport, authenticate]
})
