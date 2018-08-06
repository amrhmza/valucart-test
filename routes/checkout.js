var express = require("express");
var router = express.Router();
var checkout = require("../controllers/checkout.js");
var auth = require("../lib/auth.js");
/* GET cart page. */
router.post("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (typeof req.body.cart_id == "string") {
      req.body.cart_id = [req.body.cart_id];
    }
    res.render("payment", {
      cookies: cookies,
      data: req.body,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/add_address.js",
        "angular/controllers/checkout.js"
      ]
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
router.post("/process", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let cookie = JSON.parse(cookies);
    let order = await checkout.orderInit(cookie, req.body);
    if (order) {
      res.redirect("/checkout/success/" + order[0]);
      res.end();
    } else {
      res.status(401).json({
        error: error
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
/* GET cart page. */
router.get(
  "/success/:order_id",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      res.render("payment-success", {
        cookies: cookies,
        params: req.params,
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/factory/add_address.js",
          "angular/controllers/checkout.js"
        ]
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        error: error
      });
    }
  }
);
module.exports = router;
