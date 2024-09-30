import { z } from 'zod'
import { EntitySchema } from '../entity'

export const SubscriptionSchema = EntitySchema.extend({
  subscription: z.object({
    endpoint: z.string(),
    expirationTime: z.number().nullable(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string()
    })
  })
})

export type Subscription = z.infer<typeof SubscriptionSchema>
