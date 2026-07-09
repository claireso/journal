'use server'

import { mapMediatoMediaDto, MediaInsertDtoSchema, type MediaDto } from '@dto'
import logger from '@infrastructure/logger'
import { withAuth } from '@infrastructure/middlewares'
import { mediaService } from '@ioc/container'
import pipeAsync from '@utils/pipeAsync'

const createMedia = async (data: FormData) => {
  try {
    const body = Object.fromEntries(data.entries())

    const { file } = MediaInsertDtoSchema.parse(body)
    const media = await mediaService.create(file)
    const mediaDto = mapMediatoMediaDto(media)
    return mediaDto
  } catch (err) {
    logger.error(err, 'Could not create media')
    throw err
  }
}

export default pipeAsync<MediaDto>(withAuth, createMedia)
