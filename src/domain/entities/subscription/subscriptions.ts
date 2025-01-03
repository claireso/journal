import { z } from 'zod'
import { SubscriptionSchema } from './subscription'
import { PagerSchema } from '../pager'

export const SubscriptionsSchema = z.object({
  items: z.array(SubscriptionSchema),
  pager: PagerSchema
})

export type Subscriptions = z.infer<typeof SubscriptionsSchema>
