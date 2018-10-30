var express = require("express");
var router = express.Router();
const productListing = require("../controllers/product_list.js");
const getHome = require("../controllers/home.js");
const getMenu = require("../controllers/category_menu.js");

function camelize(string) { 
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.substring(1);
}

/* GET product list page. */
router.get("/:cat_id/:cat_name", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let cat_id = req.params.cat_id;
    let data = await productListing.get_data(
      querydata,
      cat_id,
      JSON.parse(cookies)
    );
    let banner = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    let b;

    res.render("productlisting", {
      data: data,
      menudata: menudata,
      banner: banner,
      cookies: cookies,
      angular: true,
      catdrop: data.product_type == "Bundle" ? 1 : b,
      customjs: true,
      header_title:camelize(req.params.cat_name.replace(/-/g,' '))+' - Valucart',
      description:camelize(req.params.cat_name.replace(/-/g,' '))+' - Shop for '+camelize(req.params.cat_name.replace(/-/g,' '))+' Best Online Shopping Store. Check Price and Buy Online.Free Shipping & Cash on Delivery & Best Offers',
      home_new: true,
      jslist: [
        "angular/app.js",
        "angular/factory/product_list.js",
        "angular/factory/product_details.js",
        "angular/controllers/product_list.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js",
        "js/jquery.nice-select.min.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});
/* GET product list page. */
router.get("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let cat_id = req.param("cat_id");
    let data = await productListing.get_datav2(querydata, JSON.parse(cookies));
    let banner = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    let b;
    console.log(data.product_type);
    res.render("productlisting_new", {
      data: data,
      menudata: menudata,
      banner: banner,
      cookies: cookies,
      angular: true,
      catdrop: data.product_type == "Bundle" ? 1 : b,
      customjs: true,
      header_title:"Valucart Products",
      description:'Valucart Products - Best Online Shopping Store. Check Price and Buy Online.Free Shipping & Cash on Delivery & Best Offers',
      home_new: true,
      jslist: [
        "angular/app.js",
        "angular/factory/product_list_new.js",
        "angular/factory/product_details.js",
        "angular/controllers/product_list_new.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js",
        "js/jquery.nice-select.min.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});
/* GET product list page. */
router.get("/valucartexclusives", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let data = await productListing.get_datave(querydata);
    console.log(data);

    let banner = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    res.render("productlisting_new_ve", {
      data: data,
      menudata: menudata,
      banner: banner,
      cookies: cookies,
      angular: true,
      catdrop: 1,
      customjs: true,
      home_new: true,
      jslist: [
        "angular/app.js",
        "angular/factory/product_list_new.js",
        "angular/factory/product_details.js",
        "angular/controllers/product_list_new.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js",
        "js/jquery.nice-select.min.js"
      ]
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});

/* Search Result */

router.get("/search", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let querydata = req.query;
    let query = req.param("q");
    let data = await productListing.get_datav2(querydata, JSON.parse(cookies));
    let banner = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    let b;
    res.render("search", {
      data: data,
      menudata: menudata,
      banner: banner,
      cookies: cookies,
      angular: true,
      catdrop: data.product_type == "Bundle" ? 1 : b,
      customjs: true,
      home_new: true,
      header_title:camelize(decodeURIComponent(query)).replace(/-/g,' ')+' - Valucart',
      description:camelize(decodeURIComponent(query)).replace(/-/g,' ')+' - Shop for '+camelize(decodeURIComponent(query)).replace(/-/g,' ')+' Best Online Shopping Store. Check Price and Buy Online.Free Shipping & Cash on Delivery & Best Offers',
      query:query,
      jslist: [
        "angular/app.js",
        "angular/factory/search_list.js",
        "angular/factory/product_details.js",
        "angular/controllers/search_list.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js",
        "js/jquery.nice-select.min.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
