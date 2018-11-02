var express = require("express");
var router = express.Router();
const bundle_listing = require("../controllers/bundle_list.js");
const getHome = require("../controllers/home.js");
const getMenu = require("../controllers/category_menu.js");

function camelize(string) { 
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.substring(1);
}

/* GET product list page. */
router.get("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    // let cat_id = req.param("cat_id");
    let data = await bundle_listing.get_datav2(querydata);
    let banner = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    let horizontalmenu = await getMenu.get_horizontal_menulist();
    res.render("bundle-listing_new", {
      data: data,
      banner: banner,
      cookies: cookies,
      horizontalmenu:horizontalmenu,
      menudata: menudata,
      angular: true,
      customjs: true,
      catdrop: 1,
      home_new: true,
      header_title:'ValuZone Bundles - Valucart',
      description:'ValuZone Bundles - Shop for '+'ValuZone Bundles Best Online Shopping Store. Check Price and Buy Online.Free Shipping & Cash on Delivery & Best Offers',
      jslist: [
        "angular/app.js",
        "angular/factory/bundle_list_new.js",
        "angular/controllers/bundle_list_new.js",
        "angular/factory/bundle_details.js",
        "angular/factory/userbundle.js",
        "angular/factory/wishlist.js",
        "js/jquery.nice-select.min.js"
      ]
    });
    // console.log(data);
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});
router.get("/:cat_id/:cat_name", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let cat_id = req.param("cat_id");
    let data = await bundle_listing.get_data(querydata, cat_id);
    let banner = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    console.log("TCL: menudata", menudata);
    res.render("bundle-listing", {
      data: data,
      banner: banner,
      cookies: cookies,
      menudata: menudata,
      angular: true,
      catdrop: 1,
      customjs: true,
      header_title:camelize(req.params.cat_name.replace(/-/g,' '))+' - Valucart',
      description:camelize(req.params.cat_name.replace(/-/g,' '))+' - Shop for '+camelize(req.params.cat_name.replace(/-/g,' '))+' Best Online Shopping Store. Check Price and Buy Online.Free Shipping & Cash on Delivery & Best Offers',
      home_new: true,
      jslist: [
        "angular/app.js",
        "angular/factory/bundle_list.js",
        "angular/controllers/bundle_list.js",
        "angular/factory/wishlist.js",
        "js/jquery.nice-select.min.js"
      ]
    });
  } catch (error) {
    console.log(error);
    error_404(res);
  }
});
module.exports = router;
