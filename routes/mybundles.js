var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
const getList = require("../controllers/userbundle.js");
var auth = require("../lib/auth.js");

/* GET user bundle list page. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    let data = await getList.get_mybundle(JSON.parse(cookies));
    res.render("mybundles", {
      menudata: menudata,
      data: data,
      angular: false,
      customjs: false,
      cookies: cookies
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
/**
 * Delete userbundle
 */
router.get(
  "/delete/:bundleId",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let data = await getList.deleteBundle(
        JSON.parse(cookies),
        req.param("bundleId")
      );
      res.redirect("/mybundles");
      res.end();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        error: error
      });
    }
  }
);
/**
 * View userbundle
 */
router.get(
  "/view/:bundleId",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let menudata = await getMenu.get_menulist();
      res.render("mybundle-edit", {
        menudata: menudata,
        cookies: cookies,
        bundleId: req.param("bundleId"),
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js",
          "angular/controllers/userbundle.js",
          "angular/factory/userbundle.js"
        ]
      });
    } catch (error) {
      res.status(401).json({
        error: error
      });
    }
  }
);
module.exports = router;
