var express = require('express');
var router = express.Router();

/* GET cart page. */
router.get('/', function(req, res, next) {
  res.render('mycart', { title: '' });
});
module.exports = router;
