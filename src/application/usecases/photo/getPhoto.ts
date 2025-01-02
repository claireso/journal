'use server'

import { BadRequestError } from '@domain/errors'
import { photoService } from '@ioc/container'
import { mapPhotoToPhotoDto } from '@dto'

const getPhoto = async (photoId: string) => {
  const id = Number(photoId)

  if (isNaN(id)) {
    throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: id } })
  }

  const photo = await photoService.getById(id)
  const photoDto = mapPhotoToPhotoDto(photo)

  return photoDto
}

export default getPhoto
