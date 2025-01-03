import { z } from 'zod'
import { UserSchema } from '@domain/entities'

// eslint-disable-next-line
const UserDtoSchema = UserSchema.pick({
  id: true,
  cid: true
})

export type UserDto = z.infer<typeof UserDtoSchema>
