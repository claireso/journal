'use server'

import { NotFoundError } from '@domain/errors'
import logger from '@infrastructure/logger'
import { subscriptionService } from '@ioc/container'
import { type SubscriptionDto, SubscriptionRequestDtoSchema } from '@dto'
import { cacheTag, cacheLife } from 'next/cache'

const cachedGetSubscription = async (endpoint: string) => {
  'use cache'
  cacheTag(`subscription_${endpoint}`)
  cacheLife({ revalidate: 3600 * 24 * 4 })
  return subscriptionService.getSubscriptionByEndpoint(endpoint)
}

const getSubscription = async (params: { endpoint: string }): Promise<SubscriptionDto['subscription'] | null> => {
  try {
    const { endpoint } = SubscriptionRequestDtoSchema.parse(params)
    const subscription = await cachedGetSubscription(endpoint)
    return subscription.subscription
  } catch (err) {
    // log only internal server error
    if (err instanceof NotFoundError) {
      return null
    }
    logger.error(err, 'Could not get subscription by endpoint')
    throw err
  }
}

export default getSubscription
