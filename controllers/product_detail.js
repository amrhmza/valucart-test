const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async (pd_id, cookies) => {
  try {
    axios_config["params"] = { product_id: pd_id };
    if(cookies){
      var userData= JSON.parse(cookies);
      axios_config["headers"] = {
        Authorization: "Bearer " + userData.token
      };
    }
    let response = await axios.get("/product/details/get", axios_config);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  get_data
};
