'use server'

import { pool as db } from '@infrastructure/db'
import { BadRequestError } from '@domain/errors'
import { photoService } from '@ioc/container'
import { withAuth } from '@api/middlewares'

// todo manage errors
export default async function deletePhoto(photoId: string) {
  try {
    // check user authentification
    // todo: use a kind of compose function ?
    await withAuth()

    const id = Number(photoId)

    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: photoId } })
    }

    await photoService.delete(id, db)
  } catch (err) {
    // TODO log error
    throw err
  }
}
