const express = require('express');
const router = express.Router();
const connect = require('../db/connect');
const queries = require('../db/queries');

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

module.exports = router;
