var express = require("express");
var router = express.Router();
const getAddress = require("../controllers/addresslist.js");
const getMenu = require("../controllers/category_menu.js");
var auth = require("../lib/auth.js");

router.get("/", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var udata = JSON.parse(cookies);
    let data = await getAddress.get_address(udata, "");
    let menudata = await getMenu.get_menulist();
    let horizontalmenu = await getMenu.get_horizontal_menulist();

    res.render("addressbook", {
      data: data,
      menudata: menudata,
      horizontalmenu:horizontalmenu,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/add_address.js",
        "angular/controllers/change_default_address.js"
      ]
    });
  } catch (error) {
    error_404(res);
  }
});

module.exports = router;
