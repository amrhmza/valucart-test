var express = require('express');
var router = express.Router();
const getBundle = require("../controllers/bundle_details.js");

/* GET home page. */
router.get('/:pb_id/:pb_name', async(req, res, next)=>{
  try {
    var pb_id= req.param("pb_id");
    let data = await getBundle.get_data(pb_id);
    //console.log(data);
    res.render("bundledetail", { 
      data: data,
      angular: true,
      customjs: true,
      jslist: ["angular/app.js", "angular/controllers/bundle_details.js"]
    });
  } catch (error) {
    res.status(401).json({
      error: err
    });
  } 
});

module.exports = router;
