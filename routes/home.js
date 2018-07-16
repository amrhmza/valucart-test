var express = require("express");
var router = express.Router();
const selectCountry = require("../controllers/select_city.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    let data = await selectCountry.get_data();
    console.log(data);
    res.render("home", { title: "Express" });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  }
});

module.exports = router;
