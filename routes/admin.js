const express = require('express')
const multer = require('multer')
const router = express.Router()
const pool = require('../db/db')
const queries = require('../db/queries')

const upload = multer({ dest: './public/img' })

router.get('/', (req, res) => {
  res.render('admin/admin')
})

// ALL PHOTOS
router.get('/photos', (req, res) => {
  pool
    .query(queries.get_photos())
    .then(response => {
      res.render('admin/photos/list', {
        photos: response.rows,
      })
    })
})

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
      [ photo.title, photo.description, filename, 'center', false, false ],
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

// DELETE PHOTO
router.get('/photos/:id/delete', (req, res) => {
  const { id } = req.params

  pool
    .query(queries.delete_photo(id))
    .then(response => {
      // TODO: delete file
      res.redirect('/admin/photos')
    })
})

module.exports = router
