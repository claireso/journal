import path from 'path'
import { unlink } from 'fs/promises'
import { NextRequest } from 'next/server'
import { revalidateTag, unstable_cache } from 'next/cache'
import { createRouteHandler, withAuth } from '@api/middlewares'
import { pool, queries } from '@infrastructure/db'
import {
  Photo,
  PhotoRequestSchema,
  LegacyPhotoRequestSchema,
  formatPhoto as formatPhotoHelper,
  createPhoto as createPhotoHelper
} from '@domain/entities'

interface RequestContext {
  params: { id: string }
}

const getCachedPhoto = (id: number) =>
  unstable_cache(
    async (id: number) => {
      return pool.query(queries.get_photo(id))
    },
    [],
    {
      tags: [`photo_${id}`]
    }
  )(id)

// endpoint get photo
const getPhotoById = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await getCachedPhoto(id)

  if (response.rowCount === 0) {
    return Response.json({}, { status: 404 })
  }

  const photo: Photo = formatPhotoHelper(response.rows[0])

  return Response.json(photo, { status: 200 })
}

// Endpoint edit photo
const editPhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  let response = await getCachedPhoto(id)

  if (response.rowCount === 0) {
    return Response.json({}, { status: 404 })
  }

  const photo: Photo = formatPhotoHelper(response.rows[0])
  const isPhotoLegacy = !photo.media_id

  const body = await request.json()
  const schema = isPhotoLegacy ? LegacyPhotoRequestSchema : PhotoRequestSchema
  const result = schema.parse(body)

  const newPhoto: Partial<Photo> = createPhotoHelper({
    title: result.title ?? photo.title,
    description: result.description ?? photo.description,
    media_id: result.media_id ?? photo.media_id,
    color: result.color ?? photo.color,
    position: result.position ?? photo.position
  })

  const fields = Object.entries(newPhoto)
    .map((entry, index) => `${entry[0]}=($${index + 1})`)
    .join(',')

  response = await pool.query(queries.update_photo(id, fields), Object.values(newPhoto))

  revalidateTag('photos')
  revalidateTag(`photo_${id}`)

  return Response.json(formatPhotoHelper(response.rows[0]), { status: 200 })
}

// endpoint delete photo
const deletePhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await getCachedPhoto(id)

  if (response.rowCount === 0) {
    return Response.json({}, { status: 404 })
  }

  // on delete photo, delete linked media
  try {
    // start transaction
    await pool.query('BEGIN')
    const photo: Photo = formatPhotoHelper(response.rows[0])
    // delete photo from database
    await pool.query(queries.delete_photo(id))

    if (photo.media_id) {
      // delete media from database
      await pool.query(queries.delete_media(photo.media_id))
    }

    // delete photo from the folder
    await unlink(path.resolve('uploads', photo.media.name))

    await pool.query('COMMIT')
    revalidateTag('photos')
    revalidateTag(`photo_${id}`)
    return Response.json({}, { status: 200 })
  } catch (e) {
    await pool.query('ROLLBACK')
    throw e
  }
}

export const GET = createRouteHandler(getPhotoById)
export const PATCH = createRouteHandler(withAuth, editPhoto)
export const DELETE = createRouteHandler(withAuth, deletePhoto)
