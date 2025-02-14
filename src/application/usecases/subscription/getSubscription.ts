'use server'

import { NotFoundError } from '@domain/errors'
import logger from '@infrastructure/logger'
import { subscriptionService } from '@ioc/container'
import { SubscriptionDto, SubscriptionRequestDtoSchema } from '@dto'

const getSubscription = async (params: { endpoint: string }): Promise<SubscriptionDto['subscription'] | null> => {
  try {
    const { endpoint } = SubscriptionRequestDtoSchema.parse(params)
    const subscription = await subscriptionService.getSubscriptionByEndpoint(endpoint)
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
