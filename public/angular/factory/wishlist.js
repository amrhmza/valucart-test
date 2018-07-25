app.factory("getWishList", function($http, config, $q) {
  return {
    addWish: function(productData, userData) {
      var q = $q.defer();
      var suggestURL = config.addWishList;
      let url_addwish= suggestURL+"?product_id="+productData.product_id+"&is_bundle="+productData.is_bundle;
      $http({
        method: "GET",
        url: url_addwish,
        type: "json",
        headers: {
          Authorization: "Bearer " + userData
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    removeWish: function(productData, userData) {
      var q = $q.defer();
      var suggestURL = config.removeWishList;
      let url_addwish= suggestURL+"?product_id="+productData.product_id+"&is_bundle="+productData.is_bundle;
      $http({
        method: "GET",
        url: url_addwish,
        type: "json",
        headers: {
          Authorization: "Bearer " + userData
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
