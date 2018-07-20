app.controller("bundle_details", function(
    $scope,
    $rootScope,
    $location,
    $http,
    $timeout,
    $filter,
    config
  ) {
      
        $scope.submitReviewbundle = function() {
          var product_id= $('#product_id').val();
          var usertoken= typeof($.cookie("tokenId"))?$.cookie("tokenId"):"";

          $scope.data = {
            rating: $scope.rating,
            title: $scope.title,
            review: $scope.review,
            is_product_bundle:1,
            product_id: product_id
          };
          console.log($scope.data);
          $http({
            method  : 'POST',
            url     : 'http://18.191.0.240:3000/product/review/post',
            data    : $scope.data,
            headers : { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+usertoken } 
          }).then(function (response){

          },function (error){
      
          });
        };
  });  