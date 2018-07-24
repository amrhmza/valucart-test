var express = require("express");
var router = express.Router();
const getBundle = require("../controllers/bundle_details.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get('/:pb_id/:pb_name', async(req, res, next)=>{
  try {
    var pb_id = req.param("pb_id");
    let data = await getBundle.get_data(pb_id);
    let menudata = await getMenu.get_menulist();
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    //console.log(data);
    res.render("bundledetail", {
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/bundle_review.js",
        "angular/controllers/bundle_details.js"
      ]
      
    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});

module.exports = router;
