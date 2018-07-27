app.factory("addNewAddress", function($http, config, $q) {
    return {
      add_address: function(formData, userToken) {
        //console.log(formData);
        var q = $q.defer();
        var suggestURL = config.addAddress;
        let data = formData;
        $http({
          method: "POST",
          url: suggestURL,
          type: "json",
          data: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken
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
  