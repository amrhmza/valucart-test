var express = require("express");
var router = express.Router();
const getshoppingList = require("../controllers/myshoppinglist.js");
const getMenu = require("../controllers/category_menu.js");

/* GET product list page. */
router.get("/:list_id", async (req, res, next) => {
  try {
    var list_id = req.param("list_id");
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let shoppingList = await getshoppingList.getshoppinglist(JSON.parse(cookies), list_id);
    let menudata = await getMenu.get_menulist();
    console.log(shoppingList);
    res.render("myshopping", {
      data: shoppingList,
      menudata: menudata,
      angular: true,
      customjs: true,
      cookies: cookies,
      jslist: [
        "angular/app.js",
        "angular/factory/myshipping.js",
        "angular/controllers/myshipping.js"
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



