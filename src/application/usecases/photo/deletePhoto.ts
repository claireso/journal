'use server'

import { revalidatePath } from 'next/cache'

import { BadRequestError } from '@domain/errors'
import { pool as db } from '@infrastructure/db'
import logger from '@infrastructure/logger'
import { withAuth } from '@infrastructure/middlewares'
import { photoService } from '@ioc/container'
import pipeAsync from '@utils/pipeAsync'

async function deletePhoto(photoId: string) {
  try {
    const id = Number(photoId)

    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: photoId } })
    }

    await photoService.delete(id, db)
    revalidatePath('/admin/photos')
    revalidatePath('/')
  } catch (err) {
    logger.error(err, 'Could not delete photo')
    throw err
  }
}

export default pipeAsync<void>(withAuth, deletePhoto)
