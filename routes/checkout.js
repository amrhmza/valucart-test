var express = require('express');
var router = express.Router();

/* GET cart page. */
router.get('/', function(req, res, next) {
  res.render('payment', { title: 'Express' });
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false) {
      res.redirect("/");
      res.end();
    } else {
      res.render("payment", {
        cookies: cookies,
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/factory/cart.js",
          "angular/controllers/cart.js"
        ]
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
module.exports = router;
