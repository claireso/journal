'use server'

import { cacheTag, cacheLife } from 'next/cache'

import { BadRequestError } from '@domain/errors'
import { type SubscriptionsDto } from '@dto'
import { withAuth } from '@infrastructure/middlewares'
import { subscriptionService } from '@ioc/container'
import pipeAsync from '@utils/pipeAsync'

const cachedGetPaginatedSubscriptions = async (page: number) => {
  'use cache'
  cacheTag(`subscription_list`)
  cacheLife({ revalidate: 3600 * 24 * 4 })
  return subscriptionService.getPaginatedSubscriptions(page)
}

// TODO add param limit
const getPaginatedSubscriptions = async ({ page }: { page: string }) => {
  const pageInt = Number(page)

  if (isNaN(pageInt) || pageInt < 0) {
    throw new BadRequestError('Incorrect parameter “page”', { cause: { page } })
  }

  const paginatedSubscriptions = await cachedGetPaginatedSubscriptions(pageInt ?? 1)

  return paginatedSubscriptions
}

export default pipeAsync<SubscriptionsDto>(withAuth, getPaginatedSubscriptions)
