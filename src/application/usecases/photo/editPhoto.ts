'use server'

import pipeAsync from '@utils/pipeAsync'
import { PhotoUpdateDtoSchema } from '@dto'
import { BadRequestError } from '@domain/errors'
import { photoService } from '@ioc/container'
import { withAuth } from '@infrastructure/middlewares'
import logger from '@infrastructure/logger'

async function editPhoto(data: FormData) {
  try {
    const id = Number(data.get('id'))
    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: data.get('id') } })
    }

    data.delete('id')

    const body = Object.fromEntries(data.entries())
    const result = PhotoUpdateDtoSchema.parse(body)

    await photoService.update(id, result)
  } catch (err) {
    logger.error({ err, data: Object.fromEntries(data.entries()) }, 'Could not update photo')
    throw err
  }
}

export default pipeAsync<void>(withAuth, editPhoto)
