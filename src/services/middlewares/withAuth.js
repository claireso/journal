import { getToken } from 'next-auth/jwt'

const withAuth = async (req, res, next) => {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send('Unauthorized')
    return
  }

  next()
}

export default withAuth
