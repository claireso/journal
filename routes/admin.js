const express = require('express');
const multer = require('multer');
const router = express.Router();
const connect = require('../db/connect');
const queries = require('../db/queries');

const upload = multer({ dest: './public/img' });

router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.get('/photos', function(req, res) {
  connect().then((client) => {
    client
      .query(queries.get_photos())
      .then(response => {
        res.render('admin/photos/list', {
          photos: response.rows,
        });
      });
  });
});

router.get('/photos/new', function(req, res) {
  res.render('admin/photos/new');
});

router.post('/photos/new', upload.single('file'), function(req, res, next) {
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
      });
  });
});

module.exports = router;
