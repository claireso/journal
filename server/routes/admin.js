import fs from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import { ulid } from 'ulid'

import pool from '../db/db'
import queries from '../db/queries'
import paginate from './middleware/paginate'
import render from '../utils/render'

import ListView from '../../app/admin/List'
import NewView from '../../app/admin/New'
import EditView from '../../app/admin/Edit'

import Layout from '../views/admin'


// multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve('public', 'img'))
  },
  filename: function (req, file, callback) {
    const fieldname = ulid().toLowerCase()
    const extension = path.extname(file.originalname)

    callback(null, `${ fieldname }${ extension }`)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()

const deleteFile = (photo) => new Promise((resolve, reject) => {
  const file = path.resolve('public', 'img',  photo.name)

  fs.unlink(file, resolve)
})

/////////////////////////////////////////////////////
//  ROUTES
/////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.redirect('/admin/photos')
})

// ALL PHOTOS
const renderList = (req, res, next) => {
  pool
    .query(queries.get_photos({
      options: `OFFSET ${ res.pager.offset } LIMIT ${ res.pager.limit }`
    }))
    .then(response => {
      res.send(render(Layout, ListView, {
        photos: response.rows,
        pager: res.pager,
      }))
    })
    .catch(next)
}

router.get('/photos', paginate, renderList)
router.get('/photos/page/:page', paginate, renderList)

// NEW PHOTO
router.get('/photos/new', (req, res) => {
  res.send(render(Layout, NewView))
})

router.post('/photos/new', upload.single('file'), (req, res, next) => {
  const photo = req.body
  const filename = req.file && req.file.filename

  pool
    .query(
      queries.insert_photo(),
      [
        photo.title,
        photo.description,
        filename,
        photo.position,
        photo.portrait || false,
        photo.square || false,
      ],
    )
    .then(response => {
      res.redirect('/admin/photos')
    })
    .catch(next)
})

// EDIT PHOTO
router.get('/photos/:id(\\d+)/edit', (req, res, next) => {
  const { id } = req.params

  pool
    .query(queries.find_photo(id))
    .then(response => {
      const photo = response.rows[0]

      if (photo === undefined) {
        next()
        return
      }

      res.send(render(Layout, EditView, { photo }))
    })
    .catch(next)
})

router.post('/photos/:id(\\d+)/edit', upload.single('file'), (req, res, next) => {
  const { id } = req.params
  const photo = req.body
  const filename = req.file && req.file.filename

  const newPhoto = Object.assign({}, photo)

  // TODO delete current file
  if (filename) newPhoto.name = filename

  newPhoto.square = photo.square || false
  newPhoto.portrait = photo.portrait || false

  const fields = Object.entries(newPhoto).map((entry, index) => `${ entry[0] }=($${ index + 1 })`).join(',')

  pool
    .query(
      queries.update_photo(id, fields),
      Object.values(newPhoto),
    )
    .then(response => {
      res.redirect('/admin/photos')
    })
    .catch(next)
})

// DELETE PHOTO
router.get('/photos/:id(\\d+)/delete', (req, res, next) => {
  const { id } = req.params

  pool
    .query(queries.find_photo(id))
    .then(response => {
      const photo = response.rows[0]

      if (photo === undefined) {
        return Promise.reject()
      }

      return deleteFile(response.rows[0])
    })
    .then(pool.query(queries.delete_photo(id)))
    .then(response => {
      // TODO: clear cache
      res.redirect('back')
    })
    .catch(next)
})

export default router
