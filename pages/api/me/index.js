import crud from '@services/middlewares/crud'
import withAuth from '@services/middlewares/withAuth'

const me = (req, res) => {
  res.status(200).json({
    cid: req.session.passport.user
  })
}

export default crud({
  GET: [withAuth, me]
})
