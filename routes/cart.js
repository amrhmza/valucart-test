var express = require("express");
var router = express.Router();
const cart = require("../controllers/cart.js");
const getMenu = require("../controllers/category_menu.js");
var _ = require("lodash");
var auth = require("../lib/auth.js");

/* GET cart page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    let data = await cart.get_data(JSON.parse(cookies));
    // if (_.isEmpty(data) == true) {
    //   throw data;
    // }
    if (data != "") {
      var cart_sum = 0;
      data.forEach(function(cart_total) {
        cart_sum += Number(cart_total.price) * Number(cart_total.quantity);
      });
    }
    res.render("mycart", {
      data: data,
      cookies: cookies,
      menudata: menudata,
      cart_sum: cart_sum,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/cart.js",
        "angular/controllers/cart.js",
        "angular/factory/wishlist.js"
      ]
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
module.exports = router;
