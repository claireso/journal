'use server'

import { revalidatePath } from 'next/cache'

import { BadRequestError } from '@domain/errors'
import { PhotoUpdateDtoSchema } from '@dto'
import logger from '@infrastructure/logger'
import { withAuth } from '@infrastructure/middlewares'
import { photoService } from '@ioc/container'
import pipeAsync from '@utils/pipeAsync'

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
    revalidatePath('/admin/photos')
    revalidatePath('/')
  } catch (err) {
    logger.error(err, 'Could not update photo')
    throw err
  }
}

export default pipeAsync<void>(withAuth, editPhoto)
