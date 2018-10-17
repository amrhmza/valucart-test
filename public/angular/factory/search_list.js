app.factory("getProductSearchList", function($http, config, valuecartex, $q) {

    function getUrlParameter(param, dummyPath) {
      var sPageURL = dummyPath || window.location.search.substring(1),
          sURLVariables = sPageURL.split(/[&||?]/),
          res;

      for (var i = 0; i < sURLVariables.length; i += 1) {
          var paramName = sURLVariables[i],
              sParameterName = (paramName || '').split('=');

          if (sParameterName[0] === param) {
              res = sParameterName[1];
          }
      }

      return res;
  }
  return {
    getlist: function(queryParam, page) {
      var q = $q.defer();
      var suggestURL = config.getproduct_search_list;
      let data = {
        exclusive: valuecartex.data,
        page_no: page
      };

      if (queryParam.cat) {
        data["cat_id"] = queryParam.cat;
      }
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
      if (getUrlParameter('q')) {
        data["q"] = decodeURIComponent(getUrlParameter('q'));
      }

      var headers = {};
      headers["Content-Type"] = "application/json";
      var userAuth = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      if (userAuth.status == "success") {
        headers["Authorization"] = "Bearer " + userAuth.token;
      }

      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: headers
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
