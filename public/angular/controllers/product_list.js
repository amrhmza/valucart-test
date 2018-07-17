app.controller("product_listing", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  querydata,
  getProductList
) {
  $scope.productData = [];
  $scope.page = 1;
  $scope.nextcall = 1;
  getProductList
    .getlist(querydata.queryparam, 1)
    .then(function(response) {
      let listdata = response.data.results.response;
      if (listdata != "") {
        angular.forEach(listdata, function(value, key) {
          $scope.productData.push(value);
        });
        $scope.nextcall = 1;
        $scope.page++;
      } else {
        $scope.nextcall = 0;
      }
    })
    .catch(function(response) {
      console.log(response.status);
    });
});
