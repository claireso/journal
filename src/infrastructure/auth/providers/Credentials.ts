import { User } from 'next-auth'
import escape from 'lodash/escape'
import CredentialsProvider from 'next-auth/providers/credentials'
import { mapUserToUserDto } from '@dto'
import { userService } from '@ioc/container'

export default CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials) {
    const username = escape(credentials?.username as unknown as string)
    const password = escape(credentials?.password as unknown as string)

    const user = await userService.authenticate(username, password)

    if (user) {
      return mapUserToUserDto(user) as unknown as User
    }

    return null
  }
})
