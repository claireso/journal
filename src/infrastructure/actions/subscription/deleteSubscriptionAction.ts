'use server'

import { BadRequestError } from '@domain/errors'
import { subscriptionService } from '@ioc/container'
import { withAuth } from '@api/middlewares'

// todo manage errors
export default async function deleteSubscriptionAction(subscriptionId: string) {
  try {
    // check user authentification
    // todo: use a kind of compose function ?
    await withAuth()

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
