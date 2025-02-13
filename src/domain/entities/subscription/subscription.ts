import { z } from 'zod'
import { EntitySchema } from '../entity'

export const SubscriptionSchema = EntitySchema.extend({
  subscription: z.object({
    endpoint: z.string().refine(
      (endpoint: string): boolean => {
        const validPushDomains = [
          'https://fcm.googleapis.com/fcm/send/',
          'https://updates.push.services.mozilla.com/',
          'https://wns.windows.com/',
          'https://wns2-par02p.notify.windows.com/'
        ]
        return validPushDomains.some((domain) => endpoint.startsWith(domain))
      },
      {
        message: 'Subscription endpoint is not supported'
      }
    ),
    expirationTime: z.number().nullable(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string()
    })
  })
})

export type Subscription = z.infer<typeof SubscriptionSchema>
