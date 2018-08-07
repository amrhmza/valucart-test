const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let orderInit = async (cookies, data) => {
  try {
    console.log(data);

    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let order = await axios.post("order/init/post", data, getparam);
    response = order.data.results.response;
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
module.exports = {
  orderInit
};
