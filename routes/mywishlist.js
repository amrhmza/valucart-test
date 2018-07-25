var express = require('express');
var router = express.Router();
const getMyWishlist = require("../controllers/mywishlist.js");
const getMenu = require("../controllers/category_menu.js");

/* GET cart page. */

router.get("/", async (req, res, next) => {
  try {
    
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false) {
      res.redirect("/");
      res.end();
    } 
    else {
      let data = await getMyWishlist.get_mywishlist(JSON.parse(cookies));
      let menudata = await getMenu.get_menulist();
      console.log(data);
      res.render("mywishlist", {
        data: data,
        menudata: menudata,
        cookies: cookies,
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/factory/wishlist.js",
          "angular/controllers/mywishlist.js"
        ]
      });
    }
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});

module.exports = router;