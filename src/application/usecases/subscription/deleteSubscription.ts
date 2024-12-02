'use server'

import pipeAsync from '@utils/pipeAsync'
import { BadRequestError } from '@domain/errors'
import { subscriptionService } from '@ioc/container'
import { withAuth } from '@infrastructure/middlewares'

// todo manage errors
async function deleteSubscription(subscriptionId: string) {
  try {
    const id = Number(subscriptionId)

    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { subscriptionId: subscriptionId } })
    }

    await subscriptionService.delete(id)
  } catch (err) {
    // TODO log error
    throw err
  }
}

export default pipeAsync(withAuth, deleteSubscription)
