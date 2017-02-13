const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.get('/photos', function(req, res) {
  res.render('admin/photos/list');
});

router.get('/photos/new', function(req, res) {
  res.render('admin/photos/new');
});

module.exports = router;
