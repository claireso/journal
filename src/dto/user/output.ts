import { z } from 'zod'
import { UserSchema } from '@domain/entities'

const UserDtoSchema = UserSchema.pick({
  id: true,
  cid: true
})

export type UserDto = z.infer<typeof UserDtoSchema>
