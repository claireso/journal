import CredentialsProvider from 'next-auth/providers/credentials'
import escape from 'lodash/escape'
import { pool, queries } from '@services/db'

export default CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials) {
    const cleanedUsername = escape(credentials?.username)
    const cleanedPassword = escape(credentials?.password)

    const response = await pool.query(queries.find_user_by_username(cleanedUsername, cleanedPassword))
    const user = response.rows?.[0]

    if (user) {
      return {
        id: user.cid,
        cid: user.cid
      }
    }

    return null
  }
})
