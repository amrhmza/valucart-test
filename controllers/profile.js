const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_data = async (userId) => {
  try {
    axios_config['params']= {id: userId};
    let response = await axios.get(`/userProfile/get`, axios_config);
    //console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  get_data
};
