'use server'

import { mapPhotosToPhotosDto } from '@dto'
import { photoService } from '@ioc/container'
import { BadRequestError } from '@domain/errors'

const getPaginatedPhotos = async ({ page, limit }: { page: string; limit: string }) => {
  const intPage = Number(page)
  let intLimit = 24

  if (isNaN(intPage) || intPage < 0) {
    throw new BadRequestError('Incorrect search parameter “page”', { cause: { page } })
  }

  if (limit) {
    intLimit = Number(limit)
    if (isNaN(intLimit) || intLimit < 1) {
      throw new BadRequestError('Incorrect search parameter “limit”', { cause: { limit } })
    }
  }

  const paginatedPhotos = await photoService.getPaginatedPhotos(intPage ?? 1, intLimit)
  const paginatedPhotosDto = mapPhotosToPhotosDto(paginatedPhotos)

  return paginatedPhotosDto
}

export default getPaginatedPhotos
