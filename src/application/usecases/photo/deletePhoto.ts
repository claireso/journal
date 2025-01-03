'use server'

import pipeAsync from '@utils/pipeAsync'
import { pool as db } from '@infrastructure/db'
import { BadRequestError } from '@domain/errors'
import { photoService } from '@ioc/container'
import { withAuth } from '@infrastructure/middlewares'
import logger from '@infrastructure/logger'

async function deletePhoto(photoId: string) {
  try {
    const id = Number(photoId)

    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: photoId } })
    }

    await photoService.delete(id, db)
  } catch (err) {
    logger.error(err, 'Could not delete photo')
    throw err
  }
}

export default pipeAsync<void>(withAuth, deletePhoto)
