import { z } from 'zod'
import { SubscriptionSchema } from '@domain/entities'

export const SubscriptionInsertDtoSchema = SubscriptionSchema.pick({
  subscription: true
})

export type SubscriptionInsertDto = z.infer<typeof SubscriptionInsertDtoSchema>