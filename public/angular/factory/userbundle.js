app.factory("userbundle", function($http, config, $q) {
  return {
    getDetails: function(bundleId) {
      var q = $q.defer();
      let token = JSON.parse($.cookie("vcartAuth"));
      $http({
        method: "GET",
        url: config.view_mybundle,
        type: "json",
        params: { ub_id: bundleId },
        headers: {
          Authorization: "Bearer " + token.token
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
