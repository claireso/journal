import fs from 'fs'
import path from 'path'

import crud from '@services/middlewares/crud'
import withAuth from '@services/middlewares/withAuth'
import withMulter from '@services/middlewares/withMulter'

import { pool, queries, models } from '@services/db'

const photoModel = models.photo

// UTILS
const deleteFile = (fileName) =>
  new Promise((resolve) => {
    const file = path.resolve('public', 'img', fileName)

    fs.unlink(file, resolve)
  })

// ROUTES
const getPhoto = async (req, res) => {
  const { id } = req.query

  if (isNaN(id)) {
    res.status(400).send('')
    return
  }

  try {
    const response = await pool.query(queries.get_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      res.status(404).send('')
      return
    }

    res.status(200).json(photo)
  } catch {
    res.status(500).send('')
  }
}

const editPhoto = async (req, res) => {
  try {
    const {
      query: { id },
      file
    } = req

    let response = await pool.query(queries.get_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      res.status(404).send('')
      return
    }

    const data = {
      title: photo.title,
      description: photo.description,
      name: photo.name,
      position: photo.position,
      portrait: photo.portrait,
      square: photo.square,
      updated_at: new Date(),
      // override with user inputs
      ...req.body
    }

    // TODO delete current file
    if (file) {
      data.name = file.filename
      data.width = file.width
      data.height = file.height
    }

    const newPhoto = photoModel(data)

    const fields = Object.entries(newPhoto)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')

    response = await pool.query(queries.update_photo(id, fields), Object.values(newPhoto))

    res.status(200).json(response.rows[0])
  } catch (err) {
    res.status(500).send('')
  }
}

const deletePhoto = async (req, res) => {
  const { id } = req.query

  if (isNaN(id)) {
    res.status(400).send('')
    return
  }

  try {
    const response = await pool.query(queries.get_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      res.status(404).send('')
      return
    }

    // delete photo from the folder
    await deleteFile(response.rows[0].name)

    // delete photo from database
    await pool.query(queries.delete_photo(id))

    res.status(200).json({})
  } catch {
    res.status(500).send('')
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default crud({
  GET: [getPhoto],
  PATCH: [withAuth, withMulter, editPhoto],
  DELETE: [withAuth, deletePhoto]
})
