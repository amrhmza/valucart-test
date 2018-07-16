app.factory("browse_all_purchase_orders", function($http, config, $q) {
  return {
    getData: function(pageNumber) {
      var q = $q.defer();
      let access_token = $.cookie("access_token");
      var suggestURL = config.getpurchaseorder;
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: {
          browse: {
            pageSize: "10",
            pageNumber: "" + pageNumber + ""
          }
        },
        headers: {
          Authorization: "Bearer " + access_token,
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
    },
    getPurchaseOrder: function(pageNumber) {
      return this.getData(pageNumber);
    }
  };
});
