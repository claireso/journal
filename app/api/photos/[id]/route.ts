import { NextRequest } from 'next/server'
import { BadRequestError } from '@domain/errors/errors'
import { createRouteHandler, withAuth } from '@infrastructure/middlewares'
import { pool as db } from '@infrastructure/db'
import { mapPhotoToPhotoDto, PhotoUpdateDtoSchema } from '@dto'
import { photoService } from '@ioc/container'

interface RequestContext {
  params: { id: string }
}

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

  return Response.json(photoDto, { status: 200 })
}

// endpoint delete photo
const deletePhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    throw new BadRequestError('Incorrect parameter “id”', { cause: { photoId: id } })
  }

  await photoService.delete(id, db)

  return Response.json({}, { status: 200 })
}

export const GET = createRouteHandler(getPhoto)
export const PATCH = createRouteHandler(withAuth, editPhoto)
export const DELETE = createRouteHandler(withAuth, deletePhoto)
