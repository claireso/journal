import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@web/services/middlewares'
import { pool, queries } from '@infrastructure/db'
import { MediaRequestSchema, Media, formatMedia } from '@domain/entities'
import uploadFile from '@utils/uploadFile'

// endpoint POST media
const createMedia = async (request: NextRequest) => {
  const formData = await request.formData()

  const body = Object.fromEntries(formData)

  const { file } = MediaRequestSchema.parse(body)

  const { filename, width, height } = await uploadFile(file)

  const mediaPhoto = {
    type: 'image',
    name: filename,
    width: width,
    height: height
  }

  // todo: on error, delete file in the directory
  const response = await pool.query(queries.insert_media(), [
    mediaPhoto.type,
    mediaPhoto.name,
    mediaPhoto.width,
    mediaPhoto.height
  ])

  const media: Media = formatMedia(response.rows[0])

  return Response.json(media, { status: 201 })
}

export const POST = createRouteHandler(withAuth, createMedia)
