var express = require('express');
var router = express.Router();
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get('/', async(req, res, next)=> {
  try {
    var cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var udata= JSON.parse(cookies);
    let userId = udata.user_id;
    //let data = await getProfile.get_data(userId);
    let data= "";
    let menudata = await getMenu.get_menulist();
    
    res.render("new-address", {
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: true,
      customjs: true,
      jslist: [
        "angular/app.js",
        "angular/factory/add_address.js",
        "angular/controllers/add_address.js"
      ]

    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});

module.exports = router;