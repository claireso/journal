import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { BadRequestError } from '@domain/errors/errors'
import { createRouteHandler, withAuth } from '@api/middlewares'
import { pool as db } from '@infrastructure/db'
import { mapPhotoToPhotoDto, PhotoUpdateDtoSchema } from '@dto'
import { photoService } from '@ioc/container'

interface RequestContext {
  params: { id: string }
}

// const getCachedPhoto = (id: number) =>
//   unstable_cache(
//     async (id: number) => {
//       return photoService.getById(id)
//       // return pool.query(queries.get_photo(id))
//     },
//     [],
//     {
//       tags: [`photo_${id}`]
//     }
//   )(id)

// endpoint get photo
const getPhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: id } })
  }

  const photo = await photoService.getById(id)
  const photoDto = mapPhotoToPhotoDto(photo)

  return Response.json(photoDto, { status: 200 })
}

// Endpoint edit photo
const editPhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: id } })
  }

  const body = await request.json()
  const result = PhotoUpdateDtoSchema.parse(body)

  const photo = await photoService.update(id, result)
  const photoDto = mapPhotoToPhotoDto(photo)

  revalidateTag('photos')
  revalidateTag(`photo_${id}`)

  return Response.json(photoDto, { status: 200 })
}

// endpoint delete photo
const deletePhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: id } })
  }

  await photoService.delete(id, db)

  revalidateTag('photos')
  revalidateTag(`photo_${id}`)
  return Response.json({}, { status: 200 })
}

export const GET = createRouteHandler(getPhoto)
export const PATCH = createRouteHandler(withAuth, editPhoto)
export const DELETE = createRouteHandler(withAuth, deletePhoto)
