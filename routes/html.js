var express = require('express');
var router = express.Router();

// home route to view all articles
router.get('/', (req, res) => {
  res.render('home');
});

// route to view saved articles
router.get('/saved', (req, res) => {
  res.render('saved');
});

// For all other misc. routes, send an error
router.get('*', (req, res) => {
  res.send('404');
});

module.exports = router;