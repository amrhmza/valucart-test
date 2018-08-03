var express = require("express");
var router = express.Router();
var checkout = require("../controllers/checkout.js");
/* GET cart page. */
router.post("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false && typeof req.body.cart_id != "undefined") {
      res.redirect("/");
      res.end();
    } else {
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
      let cookie = JSON.parse(cookies);
      let order = await checkout.orderInit(cookie, req.body);
      console.log(order);
      if (order) {
        res.redirect("/checkout/success");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end();
      } else {
        res.status(401).json({
          error: error
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
/* GET cart page. */
router.get("/success", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false) {
      res.redirect("/");
      res.end();
    } else {
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
