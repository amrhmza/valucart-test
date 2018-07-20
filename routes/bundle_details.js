var express = require("express");
var router = express.Router();
const getBundle = require("../controllers/bundle_details.js");

/* GET home page. */
router.get("/:pb_id", async (req, res, next) => {
  try {
    var pb_id = req.param("pb_id");
    let data = await getBundle.get_data(pb_id);
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    //console.log(data);
    res.render("bundledetail", {
      data: data,
      banner: banner,
      cookies: cookies,
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
