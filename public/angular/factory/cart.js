app.factory("cart", function($http, config, $q) {
  return {
    quantityUpdate: function(qty, cart_id) {
      var q = $q.defer();
      var suggestURL = config.cartupdate;
      let data = {
        cart_id: cart_id,
        quantity: qty
      };
      let token = JSON.parse($.cookie("vcartAuth"));
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          Authorization: "Bearer " + token.token,
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
