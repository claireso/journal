'use server'

import pipeAsync from '@utils/pipeAsync'
import { PhotoUpdateDtoSchema, mapPhotoToPhotoDto } from '@dto'
import { BadRequestError } from '@domain/errors'
import { photoService } from '@ioc/container'
import { withAuth } from '@infrastructure/middlewares'
import logger from '@infrastructure/logger'

// todo manage errors
async function editPhoto<T>(prevState: T, data: FormData): Promise<T> {
  try {
    const id = Number(data.get('id'))
    if (isNaN(id)) {
      throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: data.get('id') } })
    }

    data.delete('id')

    const body = Object.fromEntries(data.entries())
    const result = PhotoUpdateDtoSchema.parse(body)

    const photo = await photoService.update(id, result)
    const photoDto = mapPhotoToPhotoDto(photo)

    return {
      status: 'success',
      item: photoDto
    } as T
  } catch (err) {
    logger.error(err)
    return {
      status: 'error'
    } as T
  }
}

export default pipeAsync(withAuth, editPhoto)
