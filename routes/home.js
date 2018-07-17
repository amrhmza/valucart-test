var express = require("express");
var router = express.Router();
const getHome = require("../controllers/home.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    let data = await getHome.get_data();
    console.log(data);
    res.render("home", { 
      data: data,
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
