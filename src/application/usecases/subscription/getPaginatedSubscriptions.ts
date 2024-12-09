'use server'

import pipeAsync from '@utils/pipeAsync'
import { BadRequestError } from '@domain/errors'
import { subscriptionService } from '@ioc/container'
import { withAuth } from '@infrastructure/middlewares'
import { SubscriptionsDto } from '@dto'

// TODO add param limit
const getPaginatedSubscriptions = async ({ page }: { page: string }) => {
  const pageInt = Number(page)

  if (isNaN(pageInt) || pageInt < 0) {
    throw new BadRequestError('Incorrect parameter “page”', { cause: { page } })
  }

  const paginatedSubscriptions = await subscriptionService.getPaginatedSubscriptions(pageInt ?? 1)

  return paginatedSubscriptions
}

export default pipeAsync<SubscriptionsDto>(withAuth, getPaginatedSubscriptions)
