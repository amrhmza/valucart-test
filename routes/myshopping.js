var express = require("express");
var router = express.Router();
const getshoppingList = require("../controllers/myshoppinglist.js");
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

/* GET Shoping list page. */
router.get("/:list_id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var list_id = req.param("list_id");
    let shoppingList = await getshoppingList.getshoppinglist(
      JSON.parse(cookies),
      list_id
    );
    let menudata = await getMenu.get_menulist();
    console.log(shoppingList);
    res.render("myshopping", {
      data: shoppingList,
      menudata: menudata,
      angular: true,
      customjs: true,
      cookies: cookies,
      seach: 0,
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
/* Create Shoping list . */
router.get(
  "/create/:order_id",
  auth.ensureAuthenticated,
  async (req, res, next) => {
    try {
      var list_id = req.param("order_id");
      let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
      let shoppingList = await getshoppingList.createShoppingList(
        JSON.parse(cookies),
        list_id
      );
      if (shoppingList) {
        req.flash("success", "Shopping List created successfully!!");
      } else {
        req.flash("warning", "Shopping List failed to create!!");
      }
      res.redirect("/myshopping-dashboard");
    } catch (error) {
      res.status(401).json({
        error: error
      });
    }
  }
);
module.exports = router;
