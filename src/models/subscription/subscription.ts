import { z } from 'zod'
import { EntitySchema } from '../entity'

export const SubscriptionSchema = EntitySchema.extend({
  subscription: z.instanceof(PushSubscription)
})

export type Subscription = z.infer<typeof SubscriptionSchema>
