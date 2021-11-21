import crud from '@services/middlewares/crud'
import withPassport from '@services/middlewares/withPassport'

const logout = (req, res) => {
  req.logout()
  res.status(200).json({})
}

export default crud({
  POST: [withPassport, logout]
})
