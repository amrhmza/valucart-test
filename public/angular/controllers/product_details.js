app.controller("product_details", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  product_details
) {
  $scope.qty = 1;

  $scope.addtocart = function(data) {
    product_details
      .addToCart($scope.qty, data)
      .then(function(response) {
        if (response.data.results.status != "200") {
          toastr.warning(response.data.results.msg);
        } else {
          window.location = "/cart";
        }
      })
      .catch(function(response) {
        toastr.warning(response.data.results.msg);
      });
  };

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

  var postReview = function(postData, userAuth) {
    product_details
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
        rating: $scope.rating,
        title: $scope.title,
        review: $scope.review,
        is_product_bundle: 0,
        product_id: product_id
      };
      var postStatus= postReview($scope.data, usertoken);
    }
    else{
      $scope.ratingError = "It is required";
    }
  };

});
