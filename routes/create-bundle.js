var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");
const userbundle = require("../controllers/userbundle.js");

/* Create bundle. */
router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let check = await userbundle.checkpendingBundle(JSON.parse(cookies));
    console.log(check);
    if (check.results.status == 200 && check.results.response.length > 0) {
      var checkmsg =
        "Pending Bundle is there with you can update that Name here";
      var name = check.results.response[0].ub_name;
    } else {
      var checkmsg = "Give a name for your bundle";
      var name = "";
    }
    res.render("newbundle", {
      angular: false,
      customjs: false,
      search: 0,
      cookies: cookies,
      name: name,
      check: checkmsg
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});
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
    error_404(res);
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
      error_404(res);
    }
  }
);
module.exports = router;
