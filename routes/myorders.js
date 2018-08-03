var express = require("express");
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");
const myOrders = require("../controllers/myorders.js");

/* GET product list page. */
router.get("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let menudata = await getMenu.get_menulist();
    
    if (cookies == false) {
      res.redirect("/");
      res.end();
    } else {
      let data = await myOrders.get_data(JSON.parse(cookies));
      res.render("myorders", {
        menudata: menudata,
        data:data,
        angular: false,
        customjs: false,
        cookies: cookies
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});

module.exports = router;
