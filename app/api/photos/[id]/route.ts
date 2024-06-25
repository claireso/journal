import path from 'path'
import { unlink } from 'fs/promises'
import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@services/middlewares'
import { pool, queries } from '@services/db'
import uploadFile from '@utils/uploadFile'
import { Photo, PhotoRequestSchema, formatPhoto, createPhoto as createPhotoHelper } from '@models'

interface RequestContext {
  params: { id: string }
}

// endpoint get photo
const getPhotoById = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await pool.query(queries.get_photo(id))
  const photo: Photo = response.rows[0]

  if (photo === undefined) {
    return Response.json({}, { status: 404 })
  }

  return Response.json(formatPhoto(photo), { status: 200 })
}

// Endpoint edit photo
const editPhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  let response = await pool.query(queries.get_photo(id))
  const photo: Photo = response.rows[0]

  if (photo === undefined) {
    return Response.json({}, { status: 404 })
  }

  const formData = await request.formData()

  const body = Object.fromEntries(formData)

  const result = PhotoRequestSchema.safeParse(body)

  if (!result.success) {
    return Response.json(result.error.format(), { status: 422 })
  }

  const { file, ...partialPhoto } = result.data

  const data: Partial<Photo> = {
    title: partialPhoto.title ?? photo.title,
    description: partialPhoto.description ?? photo.description,
    name: photo.name,
    position: partialPhoto.position ?? photo.position,
    portrait: photo.portrait,
    square: photo.square,
    color: partialPhoto.color ?? photo.color,
    updated_at: new Date()
  }

  const uploadedFile = file.name ? await uploadFile(file) : undefined

  const newPhoto = createPhotoHelper(data, uploadedFile)

  const fields = Object.entries(newPhoto)
    .map((entry, index) => `${entry[0]}=($${index + 1})`)
    .join(',')

  response = await pool.query(queries.update_photo(id, fields), Object.values(newPhoto))

  return Response.json(formatPhoto(response.rows[0]), { status: 200 })
}

// endpoint delete photo
const deletePhoto = async (request: NextRequest, { params }: RequestContext) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await pool.query(queries.get_photo(id))
  const photo: Photo = response.rows[0]

  if (photo === undefined) {
    return Response.json({}, { status: 404 })
  }

  // delete photo from the folder
  await unlink(path.resolve('uploads', photo.name))

  // delete photo from database
  await pool.query(queries.delete_photo(id))

  return Response.json({}, { status: 200 })
}

export const GET = createRouteHandler(getPhotoById)
export const PATCH = createRouteHandler(withAuth, editPhoto)
export const DELETE = createRouteHandler(withAuth, deletePhoto)
