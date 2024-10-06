import { z } from 'zod'
import { ListSchema } from '../list'
import { SubscriptionSchema } from './subscription'

export const SubscriptionsSchema = ListSchema(z.array(SubscriptionSchema))

export type Subscriptions = z.infer<typeof SubscriptionsSchema>
