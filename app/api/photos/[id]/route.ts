import path from 'path'
import { unlink } from 'fs/promises'
import { NextRequest } from 'next/server'
import { createRouteHandler, withAuth } from '@services/middlewares'
import { pool, queries, models } from '@services/db'
import uploadFile from '@utils/uploadFile'

const photoModel = models.photo
const formatPhoto = models.formatPhoto

interface Context {
  params: { id: string }
}

// Get a photo by id
const getPhotoById = async (request: NextRequest, { params }: Context) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await pool.query(queries.get_photo(id))
  const photo = response.rows[0]

  if (photo === undefined) {
    return Response.json({}, { status: 404 })
  }

  return Response.json(formatPhoto(photo), { status: 200 })
}

// Edit a photo
const editPhoto = async (request: NextRequest, { params }: Context) => {
  const id = Number(params.id)
  const formData = await request.formData()

  const fileToUpload = formData.get('file') as File

  const title = formData.get('title') as Photo['title']
  const description = formData.get('description') as Photo['description']
  const position = formData.get('position') as Photo['position']
  const color = formData.get('color') as Photo['color']

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  let response = await pool.query(queries.get_photo(id))
  const photo = response.rows[0]

  if (photo === undefined) {
    return Response.json({}, { status: 404 })
  }

  const data = {
    title: title ?? photo.title,
    description: description ?? photo.description,
    name: photo.name,
    position: position ?? photo.position,
    portrait: photo.portrait,
    square: photo.square,
    color: color ?? photo.color,
    updated_at: new Date()
  } as any

  // TODO delete current file
  if (fileToUpload.name) {
    const file = await uploadFile(fileToUpload)
    data.name = file.filename
    data.width = file.width
    data.height = file.height
  }

  const newPhoto = photoModel(data)

  const fields = Object.entries(newPhoto)
    .map((entry, index) => `${entry[0]}=($${index + 1})`)
    .join(',')

  response = await pool.query(queries.update_photo(id, fields), Object.values(newPhoto))

  return Response.json(formatPhoto(response.rows[0]), { status: 200 })
}

// Delete a photo
const deletePhoto = async (request: NextRequest, { params }: Context) => {
  const id = Number(params.id)

  if (isNaN(id)) {
    return Response.json({}, { status: 400 })
  }

  const response = await pool.query(queries.get_photo(id))
  const photo = response.rows[0]

  if (photo === undefined) {
    return Response.json({}, { status: 404 })
  }

  // delete photo from the folder
  await unlink(path.resolve('uploads', photo.name))

  // delete photo from database
  await pool.query(queries.delete_photo(id))

  return Response.json({}, { status: 200 })
}

const GET = createRouteHandler(getPhotoById)

const PATCH = createRouteHandler(withAuth, editPhoto)

const DELETE = createRouteHandler(withAuth, deletePhoto)

export { GET, PATCH, DELETE }
