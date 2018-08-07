var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

router.get("/:order_id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    res.render("create-bundle", {
      menudata: menudata,
      angular: false,
      customjs: false,
      cookies: cookies,
      order_id: req.params
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
router.get(
  "/next/product",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let menudata = await getMenu.get_menulist();
      res.render("create-bundle-cp", {
        menudata: menudata,
        angular: true,
        customjs: true,
        cookies: cookies,
        jslist: [
          "angular/app.js",
          "angular/factory/createUserBundle.js",
          "angular/controllers/createUserBundle.js"
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
