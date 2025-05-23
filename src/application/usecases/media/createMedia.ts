'use server'

import pipeAsync from '@utils/pipeAsync'
import { withAuth } from '@infrastructure/middlewares'
import logger from '@infrastructure/logger'
import { mediaService } from '@ioc/container'
import { mapMediatoMediaDto, MediaInsertDtoSchema, MediaDto } from '@dto'

const createMedia = async (data: FormData) => {
  try {
    const body = Object.fromEntries(data)
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
