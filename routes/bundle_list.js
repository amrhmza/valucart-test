var express = require("express");
var router = express.Router();
const bundle_listing = require("../controllers/bundle_list.js");
const getHome = require("../controllers/home.js");

/* GET product list page. */
router.get("/:cat_id/:cat_name", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let cat_id = req.param("cat_id");
    let data = await bundle_listing.get_data(querydata, cat_id);
    let banner = await getHome.get_data();
    res.render("bundle-listing", {
      data: data,
      banner: banner,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/bundle_list.js",
        "angular/controllers/bundle_list.js"
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
