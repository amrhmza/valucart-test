var express = require('express');
var router = express.Router();
const getAddress = require("../controllers/addresslist.js");
const getMenu = require("../controllers/category_menu.js");

router.get("/", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    if (cookies == false) {
      res.redirect("/");
      res.end();
    } else {
      var udata = JSON.parse(cookies);
      let data = await getAddress.get_address(udata,"");
      let menudata = await getMenu.get_menulist();
      
      res.render("addressbook", {
        data: data,
        menudata: menudata,
        cookies: cookies,
        angular: true,
        customjs: true,
        jslist: [
          "angular/app.js"
        ]
      });
    }
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});

module.exports = router;
