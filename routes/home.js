var express = require("express");
var router = express.Router();
const getHome = require("../controllers/home.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
 // console.log("Cookies :  ", req.cookies);
  try {
    let data = await getHome.get_data();
    let menudata = await getMenu.get_menulist();
    let cookies= (!req.cookies.vcartAuth)?false:req.cookies.vcartAuth;
    // console.log(data.response.exclusive);
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
        
      ]
    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  } 
});

module.exports = router;
