var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('payment-success',{title:' Payment Sucess'});
});

module.exports = router;