app.factory("myShipping", function($http, config, $q) {
  return {
    removeShipping: function(shipping_id, userData) {
      var q = $q.defer();
      let suggestURL= config.shippinglistRemove+"/"+shipping_id;
      $http({
        method: "DELETE",
        url: suggestURL,
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