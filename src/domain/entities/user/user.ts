import { z } from 'zod'
import { EntitySchema } from '../entity'

export const UserSchema = EntitySchema.extend({
  cid: z.uuid(),
  username: z.string()
})

export type User = z.infer<typeof UserSchema>
