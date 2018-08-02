app.controller("myshippingList", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  myShipping
) {

  //Prdouct Review Controler
  $scope.removeShippingList = function(shipping_id, item) {
    
    var elem= angular.element(item);
    var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    var usertoken= (userAuth!="")?userAuth.token: "";

    myShipping
      .removeShipping(shipping_id, usertoken)
      .then(function(response) {
        console.log(response);
        var res= response.data.results;
        if(res==true){
          elem.closest(".shiplist_block").remove();
          var numItems = $('.shiplist_block').length;
          if(numItems<1){
            $(".empty-panel").removeClass("hidden");
          }
          toastr.success(response.data.results);
        }
      })
      .catch(function(response) {
        console.log(response);
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

  var shipplistform = document.forms.shipplistForm,
    elem = shipplistform.elements;
  shipplistform.onsubmit = function() {
      //console.log(elem.cnew_password.proudct_id);
  };

});
