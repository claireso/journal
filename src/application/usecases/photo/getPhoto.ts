'use server'

import { cacheLife, cacheTag } from 'next/cache'

import { BadRequestError } from '@domain/errors'
import { mapPhotoToPhotoDto } from '@dto'
import { photoService } from '@ioc/container'

const cachedGetPhoto = async (id: number) => {
  'use cache'
  cacheTag(`photo_${id}`)
  cacheLife({ revalidate: 3600 * 24 * 4 })
  return photoService.getById(id)
}

const getPhoto = async (photoId: string) => {
  const id = Number(photoId)

  if (isNaN(id)) {
    throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: id } })
  }

  const photo = await cachedGetPhoto(id)
  const photoDto = mapPhotoToPhotoDto(photo)

  return photoDto
}

export default getPhoto
