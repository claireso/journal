const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const pool = require('../db/db')
const queries = require('../db/queries')
const paginate = require('./middleware/paginate')

const upload = multer({ dest: './public/img' })

const router = express.Router()

const deleteFile = (photo) => new Promise((resolve, reject) => {
  if (!photo) resolve()

  const file = path.resolve('public/img', photo.name)

  fs.unlink(file, resolve)
});

/////////////////////////////////////////////////////
//  ROUTES
/////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.render('admin/admin')
})

// ALL PHOTOS
const renderList = (req, res, next) => {
  pool
    .query(queries.get_photos({
      options: `OFFSET ${ res.pager.offset } LIMIT ${ res.pager.limit }`
    }))
    .then(response => {
      res.render('admin/photos/list', {
        photos: response.rows,
        pager: res.pager
      })
    })
}

router.get('/photos', paginate, renderList)
router.get('/photos/page/:page', paginate, renderList)

// NEW PHOTO
router.get('/photos/new', (req, res) => {
  res.render('admin/photos/new')
})

router.post('/photos/new', upload.single('file'), (req, res) => {
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
})

// EDIT PHOTO
router.get('/photos/:id/edit', (req, res) => {
  const { id } = req.params

  pool
    .query(queries.find_photo(id))
    .then(response => {
      res.render('admin/photos/edit', {
        photo: response.rows[0],
      })
    })
})

router.post('/photos/:id/edit', upload.single('file'), (req, res) => {
  const { id } = req.params
  const photo = req.body
  const filename = req.file && req.file.filename

  // TODO delete current file
  if (filename) photo.name = filename

  const fields = Object.entries(photo).map((entry, index) => `${ entry[0] }=($${ index + 1 })`).join(',')

  pool
    .query(
      queries.update_photo(id, fields),
      Object.values(photo),
    )
    .then(response => {
      res.redirect('/admin/photos')
    })
})

// DELETE PHOTO
router.get('/photos/:id/delete', (req, res) => {
  const { id } = req.params

  pool
    .query(queries.find_photo(id))
    .then(response => deleteFile(response.rows[0]))
    .then(pool.query(queries.delete_photo(id)))
    .then(response => {
      // TODO: clear cache
      res.redirect('back')
    })
})

module.exports = router
