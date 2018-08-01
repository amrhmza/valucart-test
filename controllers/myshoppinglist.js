const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let getshoppinglist = async (cookies, list_id) => {
  
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
   
    var lid= (list_id!="")?list_id:"";
    
    let response = await axios.get("/shopping_list/"+lid, getparam);
    return response.data.results.response;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getshoppinglist
};
 