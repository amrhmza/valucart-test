var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");
const userbundle = require("../controllers/userbundle.js");
const schedule = require("../controllers/schedule.js");
const getMenu = require("../controllers/category_menu.js");

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
      menudata: menudata,
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
  "/success/:bundle_id",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let valid = await schedule.get_data(
        JSON.parse(cookies),
        req.params.bundle_id
      );
      if (valid.status == 200) {
        var d = valid.response;
      } else {
        var d = 0;
      }
      res.render("bundle-success", {
        // menudata: menudata,
        angular: false,
        data: d,
        params: req.params,
        search: 0,
        customjs: false,
        cookies: cookies,
        order_id: req.params
      });
    } catch (error) {
      error_404(res);
    }
  }
);
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
router.get(
  "/process/:order_id",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      console.log(req.params);

      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let menudata = await getMenu.get_menulist();
      res.render("create-bundle_new", {
        menudata: menudata,
        angular: true,
        customjs: true,
        order_id: req.params.order_id,
        cookies: cookies,
        jslist: [
          "angular/app.js",
          "angular/factory/createUserBundle.js",
          "angular/controllers/createUserBundle.js"
        ]
      });
    } catch (error) {
      console.log(error);

      error_404(res);
    }
  }
);
module.exports = router;
