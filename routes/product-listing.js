var express = require("express");
var router = express.Router();
const productListing = require("../controllers/product_list.js");
const getHome = require("../controllers/home.js");

/* GET product list page. */
router.get("/:cat_id/:cat_name", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let cat_id = req.param("cat_id");
    let data = await productListing.get_data(querydata, cat_id);
    let banner = await getHome.get_data();
    res.render("productlisting", {
      data: data,
      banner: banner,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/product_list.js",
        "angular/controllers/product_list.js"
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
