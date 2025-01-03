import { UserDto } from '@dto'

declare module 'next-auth' {
  interface User {
    id: UserDto['id']
    cid: UserDto['cid']
  }
}
