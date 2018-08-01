app.controller("userbundle", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  $routeParams,
  config,
  dataset,
  userbundle
) {
  $scope.edit_title = 0;
  userbundle
    .getDetails(dataset.bundleId)
    .then(function(response) {
      console.log(response.data);
      $scope.mybundle = response.data.results.response.product;
      $scope.mybundle_name = response.data.results.response.ub_name;
    })
    .catch(function(response) {
      console.log(response);
    });
  $scope.qty_plus = function(fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal + 1;
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal + 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
    }
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function(fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
    }
  };
  $scope.change_title = function() {
    if ($scope.edit_title == 0) {
      $scope.edit_title = 1;
    } else {
      $scope.edit_title = 0;
    }
  };
});
