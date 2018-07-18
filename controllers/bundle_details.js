const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async pb_id => {
  try {
    axios_config['params']= {product_id: pb_id};
    let response = await axios.get(`/product/details_pb/get`, axios_config);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  get_data
};
