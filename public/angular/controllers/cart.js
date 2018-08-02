app.controller("cart", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  cart
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
    let qty = currentVal + 1;
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal + 1);
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal + 1
      );
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.updateCart(qty, index);
    $scope.cartTotal();
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function(fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    let qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal - 1
      );
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.updateCart(qty, index);
    $scope.cartTotal();
  };

  $scope.updateCart = function(qty, index) {
    cart
      .quantityUpdate(qty, index)
      .then(function(response) {})
      .catch(function(response) {
        // toastr.warning(response.data.results.msg);
      });
  };

  $scope.cartTotal = function() {
    var ctotal = 0;
    var delivery_charge = 15.0;
    angular.forEach(angular.element(".productcount"), function(value, key) {
      var a = angular.element(value);
      ctotal +=
        parseFloat(a.attr("data-price")) * parseFloat(a.attr("data-qty"));
    });
    var grand_total = parseFloat(ctotal) + parseFloat(delivery_charge);
    $(".c_subtotal").html(ctotal);
    $(".c_gtotal").html(grand_total);
  };
});
