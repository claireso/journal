const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const pool = require('../db/db')
const queries = require('../db/queries')
const paginate = require('./middleware/paginate')
const render = require('../utils/render')

const ListView = require('../../app/admin/List')
const NewView = require('../../app/admin/New')
const EditView = require('../../app/admin/Edit')

const Layout = require('../views/admin')

const upload = multer({ dest: './public/img' })

const router = express.Router()

const deleteFile = (photo) => new Promise((resolve, reject) => {
  const file = path.resolve('public/img', photo.name)

  fs.unlink(file, resolve)
});

/////////////////////////////////////////////////////
//  ROUTES
/////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.redirect('admin/photos')
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

module.exports = router
