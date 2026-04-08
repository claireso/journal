'use server'

import { cacheTag, cacheLife } from 'next/cache'

import { mapPhotosToPhotosDto } from '@dto'
import { photoService } from '@ioc/container'
import { BadRequestError } from '@domain/errors'

const cachedGetPaginatedPhotos = async (page: number, limit: number) => {
  'use cache'
  cacheTag(`photo_list`)
  cacheLife({ revalidate: 3600 * 24 * 4 })
  return photoService.getPaginatedPhotos(page, limit)
}

const getPaginatedPhotos = async ({ page, limit }: { page: string; limit?: string }) => {
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

  const paginatedPhotos = await cachedGetPaginatedPhotos(intPage ?? 1, intLimit)
  const paginatedPhotosDto = mapPhotosToPhotosDto(paginatedPhotos)

  return paginatedPhotosDto
}

export default getPaginatedPhotos
