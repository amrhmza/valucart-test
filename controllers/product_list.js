const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
var _ = require('lodash');
// const Logger = require("../lib/logger").Logger;

let get_data = async (querydata, cat_id) => {
  try {
    querydata["cat_id"] = cat_id;
    let response = {};
    let getparam = axios_config;
    getparam["params"] = { cat_id: cat_id };
    let product_filter = await axios.get("product/filter/get", getparam);
    if (_.isEmpty(product_filter.data.results.response)==true) {
      // throw product_filter;
    }
    response["product_config"] = product_filter.data.results.response;
    response["querydata"] = querydata;
    return response;
  } catch (error) {
    return product_filter;
  }
};
module.exports = {
  get_data
};
