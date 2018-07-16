var express = require("express");
var router = express.Router();
const selectCountry = require("../controllers/select_city.js");

/* GET select page. */
router.get("/", async (req, res, next) => {
  try {
    let data = await selectCountry.get_data();
    res.render("select-city", {
      data: data,
      angular: true,
      customjs: true,
      jslist: ["angular/app.js", "angular/controllers/select_city.js"]
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error
    });
  }
});

module.exports = router;
