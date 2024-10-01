import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@api/middlewares'
import { mediaService } from '@ioc/container'
import { mapMediatoMediaDto, MediaInsertDtoSchema } from '@dto'

const createMedia = async (request: NextRequest) => {
  const formData = await request.formData()

  const body = Object.fromEntries(formData)

  const { file } = MediaInsertDtoSchema.parse(body)

  const media = await mediaService.create(file)
  const mediaDto = mapMediatoMediaDto(media)

  return Response.json(mediaDto, { status: 201 })
}

export const POST = createRouteHandler(withAuth, createMedia)
