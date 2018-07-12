var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('select-area', { title: '' });
});

module.exports = router;
