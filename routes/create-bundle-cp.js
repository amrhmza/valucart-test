var express = require('express');
var router = express.Router();

/* GET cart page. */
router.get('/', function(req, res, next) {
  res.render('create-bundle-cp', { title: '' });
});
module.exports = router;
