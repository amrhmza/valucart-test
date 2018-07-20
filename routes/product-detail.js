var express = require("express");
var router = express.Router();
const productDetail = require("../controllers/product_detail.js");

/* Get product details */
router.get("/:pd_id/:pd_name", async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let pd_id = req.param("pd_id");
    // let pd_name = req.param("pd_name");
    let data = await productDetail.get_data(pd_id);
    res.render("productdetail", {
      data: data,
      banner: banner,
      cookies: cookies,
      angular: false,
      customjs: false
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});
module.exports = router;
