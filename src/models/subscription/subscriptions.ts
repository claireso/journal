import { z } from 'zod'
import { PagerSchema } from '../pager'
import { SubscriptionSchema } from './subscription'

export const SubscriptionsSchema = z.object({
  items: z.array(SubscriptionSchema),
  pager: PagerSchema
})

export type Subscriptions = z.infer<typeof SubscriptionsSchema>
