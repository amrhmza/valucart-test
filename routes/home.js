var express = require("express");
var router = express.Router();
const getHome = require("../controllers/home.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
 // console.log("Cookies :  ", req.cookies);
  try {
    let data = await getHome.get_data();
    let cookies= (!req.cookies.vcartAuth)?false:req.cookies.vcartAuth;
    //console.log(req.cookies.vcartAuth);
    //console.log(data);
    res.render("home", {
      data: data,
      angular: false,
      customjs: false,
      cookies: cookies
    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  } 
});

module.exports = router;
