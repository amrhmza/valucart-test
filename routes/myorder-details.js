var express = require("express");
var router = express.Router();
const orderDetail = require("../controllers/myorder_detail.js");
var auth = require("../lib/auth.js");
var moment = require("moment");

/* GET product list page. */
router.get("/:order_id", auth.ensureAuthenticated, async (req, res, next) => {
  try {
    let cookies = !req.cookies.vcartAuth ? false : req.cookies.vcartAuth;
    let data = await orderDetail.get_data(JSON.parse(cookies), req.params);
    console.log(data.order_products);

    res.render("myorder-details", {
      data: data,
      angular: false,
      search: 0,
      moment: moment,
      customjs: false,
      cookies: cookies
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});

module.exports = router;
