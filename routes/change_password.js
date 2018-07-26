var express = require("express");
var router = express.Router();

/* GET cart page. */
router.get("/", function(req, res, next) {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    res.render("change-password", {
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/controllers/change_password.js"
      ]
    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});
module.exports = router;
