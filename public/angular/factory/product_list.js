app.factory("getProductList", function($http, config, $q) {
  return {
    getlist: function(queryParam, page) {
      var q = $q.defer();
      var suggestURL = config.getproduct_list;
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: {
          cat_id: queryParam.cat_id
        },
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
