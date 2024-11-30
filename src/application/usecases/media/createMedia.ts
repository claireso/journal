'use server'

import { withAuth } from '@api/middlewares'
import { mediaService } from '@ioc/container'
import { mapMediatoMediaDto, MediaInsertDtoSchema } from '@dto'

const createMedia = async (data: FormData) => {
  try {
    await withAuth()
    const body = Object.fromEntries(data)
    const { file } = MediaInsertDtoSchema.parse(body)
    const media = await mediaService.create(file)
    const mediaDto = mapMediatoMediaDto(media)
    return mediaDto
  } catch (err) {
    throw err
  }
}

export default createMedia
