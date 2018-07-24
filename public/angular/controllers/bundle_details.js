app.controller("bundle_details", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  postBundleReview
) {
  
  var postReview = function(postData, userAuth) {
    postBundleReview
      .postReview(postData, userAuth)
      .then(function(response) {
        console.log(response.data);
        var postResult= response.data;
        if(postResult.msg="success"){
          var reviewStatus= postResult.results.response.msg;
          $scope.postReviewstatus= reviewStatus;
          var userName= JSON.parse($.cookie("vcartAuth")).username;
          var date= $filter('date')(new Date(), "MMM dd, y hh:mm a");
          var newRev= '<div class="review"><p class="userdate">'+userName+', '+date+'</p><p class="star"><span class="stars"><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i></span> '+postData.rating+' out of 5</p><h5>'+postData.title+'</h5><p>'+postData.review+'</p></div>';
          $scope.newReview= postData;
          var el= angular.element( document.querySelector( '.review' ));
          el.prepend(newRev);
          angular.element('#closebtn').triggerHandler('click');
        }
        else{
          var reviewStatus= postResult.results.response.msg;
          var myEl = angular.element( document.querySelector( '#rstatus' ) );
          myEl.addClass('has-error');
          $scope.postReviewstatus= reviewStatus;
        }
      })
      .catch(function(response) {
        console.log(response);
      });
  };

  $scope.submitReviewbundle = function() {
    var product_id = $("#product_id").val();
    var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    var usertoken= (userAuth!="")?userAuth.token: "";

    if($scope.rating!=undefined){
      $scope.ratingError = "";
      $scope.data = {
        name: $scope.name,
        rating: $scope.rating,
        title: $scope.title,
        review: $scope.review,
        is_product_bundle: 1,
        product_id: product_id
      };
      var postStatus= postReview($scope.data, usertoken);
    }
    else{
      $scope.ratingError = "It is required";
    }
  };
  
});
