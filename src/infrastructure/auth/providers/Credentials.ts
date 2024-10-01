import escape from 'lodash/escape'
import CredentialsProvider from 'next-auth/providers/credentials'
import { userService } from '@ioc/container'
import { mapUserToUserDto } from '@dto'

export default CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials) {
    const username = escape(credentials?.username)
    const password = escape(credentials?.password)

    const user = await userService.authenticate(username, password)

    if (user) {
      return mapUserToUserDto(user)
    }

    return null
  }
})
