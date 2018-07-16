var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mybundle-edit', { title: '' });
});

module.exports = router;
