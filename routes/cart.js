var express = require("express");
var router = express.Router();
const cart = require("../controllers/cart.js");
const getMenu = require("../controllers/category_menu.js");
var _ = require("lodash");

/* GET cart page. */
router.get("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    if (cookies == false) {
      res.redirect("/");
      res.end();
    } else {
      let data = await cart.get_data(JSON.parse(cookies));
      // if (_.isEmpty(data) == true) {
      //   throw data;
      // }
      res.render("mycart", {
        data: data,
        cookies: cookies,
        menudata: menudata,
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
