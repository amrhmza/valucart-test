var express = require("express");
var router = express.Router();

/* GET cart page. */
router.post("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false && typeof req.body.cart_id != "undefined") {
      res.redirect("/");
      res.end();
    } else {
      res.render("payment", {
        cookies: cookies,
        posted: req.body,
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/factory/add_address.js",
          "angular/controllers/checkout.js"
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
router.post("/process", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false && typeof req.body.cart_id != "undefined") {
      res.redirect("/");
      res.end();
    } else {
      console.log(req.body);
      
      res.render("payment-success", {
        cookies: cookies,
        posted: req.body,
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/factory/add_address.js",
          "angular/controllers/checkout.js"
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
