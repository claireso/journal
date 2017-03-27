const express = require('express');
const multer = require('multer');
const router = express.Router();
const connect = require('../db/connect');
const queries = require('../db/queries');

const upload = multer({ dest: './public/img' });

router.get('/', (req, res) => {
  res.render('admin/admin');
});

// ALL PHOTOS
router.get('/photos', (req, res) => {
  connect().then((client) => {
    client
      .query(queries.get_photos())
      .then(response => {
        res.render('admin/photos/list', {
          photos: response.rows,
        });
        client.end();
      });
  });
});

// NEW PHOTO
router.get('/photos/new', (req, res) => {
  res.render('admin/photos/new');
});

router.post('/photos/new', upload.single('file'), (req, res) => {
  const photo = req.body;
  const filename = req.file && req.file.filename;

  connect().then((client) => {
    client
      .query(
        queries.insert_photo(),
        [photo.title, photo.description, filename, 'center', false, false]
      )
      .then(response => {
        res.redirect('/admin/photos');
        client.end();
      });
  });
});

// EDIT PHOTO
router.get('/photos/:id/edit', (req, res) => {
  const { id } = req.params;

  connect().then((client) => {
    client
      .query(
        queries.find_photo(id),
      )
      .then(response => {
        res.render('admin/photos/edit', {
          photo: response.rows[0],
        });
        client.end();
      });
  });
});

// DELETE PHOTO
router.get('/photos/:id/delete', (req, res) => {
  const { id } = req.params;

  connect().then((client) => {
    client
      .query(
        queries.delete_photo(id),
      )
      .then(response => {
        console.log(response);
        // TODO: delete file
        res.redirect('/admin/photos');
        client.end();
      });
  });
});

module.exports = router;
