var express = require('express');
var router = express.Router();
const getProfile = require("../controllers/profile.js");
const getMenu = require("../controllers/category_menu.js");

/* GET home page. */
router.get('/', async(req, res, next)=> {
  try {
    var cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    var udata= JSON.parse(cookies);
    let data = await getProfile.get_data(udata);
    let menudata = await getMenu.get_menulist();
    
    res.render("profile", {
      data: data,
      menudata: menudata,
      cookies: cookies,
      angular: false,
      customjs: false
    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});

module.exports = router;
