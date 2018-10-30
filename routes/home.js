var express = require("express");
var router = express.Router();
const getHome = require("../controllers/home.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get("/home", async (req, res, next) => {
  //console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getHome.get_data(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("home", {
      data: data,
      menudata: menudata,
      angular: true,
      customjs: true,
      cookies: cookies,      
      jslist: [
        "angular/app.js",
        "angular/factory/product_details.js",
        "angular/controllers/home.js",
        "angular/factory/wishlist.js",
        "angular/factory/userbundle.js"
      ]
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});
/* GET home page. */
router.get("/", async (req, res, next) => {
  //console.log("Cookies :  ", req.cookies);
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await getHome.get_data(JSON.parse(cookies));
    let menudata = await getMenu.get_menulist();
    res.render("home-new-kutung", {
      data: data,
      menudata: menudata,
      angular: false,
      customjs: false,
      catdrop: 1,
      header_title:"Grocery Store - Shop for Groceries Online at ValuCart",
      description:'Best Online Shopping Store. Check Price and Buy Online.Free Shipping & Cash on Delivery & Best Offers',
      cookies: cookies
    });
  } catch (error) {
    console.log(error);

    error_404(res);
  }
});

/* GET home page. */
router.get("/healthcheck", async (req, res, next) => {
res.send('200')
})

module.exports = router;
