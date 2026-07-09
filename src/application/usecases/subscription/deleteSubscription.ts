'use server'

import { revalidatePath } from 'next/cache'

import { BadRequestError } from '@domain/errors'
import logger from '@infrastructure/logger'
import { withAuth } from '@infrastructure/middlewares'
import { subscriptionService } from '@ioc/container'
import pipeAsync from '@utils/pipeAsync'

async function deleteSubscription(subscriptionId: string) {
  try {
    const id = Number(subscriptionId)

    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { subscriptionId: subscriptionId } })
    }

    await subscriptionService.delete(id)
    revalidatePath('/admin/subscriptions')
    revalidatePath('/')
  } catch (err) {
    logger.error(err, 'Could not delete subscription')
    throw err
  }
}

export default pipeAsync<void>(withAuth, deleteSubscription)
