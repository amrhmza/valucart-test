app.factory("getProductList", function($http, config, $q) {
  return {
    getlist: function(queryParam, page) {
      var q = $q.defer();
      var suggestURL = config.getproduct_list;
      let data = {
        cat_id: queryParam.cat_id,
        page_no: page
      };
      if (queryParam.sub_cat) {
        data["sub_cat_id"] = queryParam.sub_cat;
      }
      if (queryParam.price_start) {
        data["price_start"] = queryParam.price_start;
      }
      if (queryParam.price_end) {
        data["price_end"] = queryParam.price_end;
      }
      if (queryParam.discount_start) {
        data["discount_start"] = queryParam.discount_start;
      }
      if (queryParam.discount_end) {
        data["discount_end"] = queryParam.discount_end;
      }
      if (queryParam.brand) {
        data["brand"] = queryParam.brand.split(",");
      }
      if (queryParam.order_by) {
        data["order_by"] = queryParam.order_by;
      }
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    }
  };
});
