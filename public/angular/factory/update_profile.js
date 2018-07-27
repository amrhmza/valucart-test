app.factory("updateProfile", function($http, config, $q) {
  return {
    update_profile: function(formData) {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.user_profileUpdate;
      let data = formData;
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
