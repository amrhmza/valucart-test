app.controller("select_city", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config
) {
  //////select_city/////////
  var select_city = document.forms.selectCity;
  select_city.onsubmit = function() {
    if (typeof $scope.city_selected == "undefined") {
      toastr.warning("Please Select area!");
    } else {
      localStorage.setItem("city", $scope.city_selected);
      window.location.href = "/area/" + $scope.city_selected;
    }
  };
});
