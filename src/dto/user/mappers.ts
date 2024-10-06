import type { User } from '@domain/entities'
import type { UserDto } from './output'

export const mapUserToUserDto = (user: User): UserDto => ({
  id: user.id,
  cid: user.cid
})
