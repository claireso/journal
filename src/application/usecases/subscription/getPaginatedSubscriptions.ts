'use server'

import { BadRequestError } from '@domain/errors'
import { subscriptionService } from '@ioc/container'

// TODO add param limit
const getPaginatedSubscriptions = async ({ page }: { page: string }) => {
  const pageInt = Number(page)

  if (isNaN(pageInt) || pageInt < 0) {
    throw new BadRequestError('Incorrect parameter “page”', { cause: { page } })
  }

  const paginatedSubscriptions = await subscriptionService.getPaginatedSubscriptions(pageInt ?? 1)

  return paginatedSubscriptions
}

export default getPaginatedSubscriptions
