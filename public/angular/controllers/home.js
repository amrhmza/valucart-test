app.controller("home", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  product_details,
  getWishList
) {
  /**
   *
   * @param {*} data
   */
  $scope.addtocart = function(data) {
    var currentVal = parseInt($("input[name=qty_" + data + "]").val());
    if (currentVal > 0) {
      product_details
        .addToCart(currentVal, data)
        .then(function(response) {
          if (response.data.results.status != "200") {
            toastr.warning(response.data.results.msg);
          } else {
            toastr.success(response.data.results.msg);
            var cartOldQty = localStorage.getItem("cartCount");
            var newCartQty = parseInt(cartOldQty) + parseInt(1);
            localStorage.setItem("cartCount", newCartQty);
            $(".cart-label").text(newCartQty);
          }
        })
        .catch(function(response) {
          toastr.warning(response.data.results.msg);
        });
    } else {
      toastr.error("Please check the quantity");
    }
  };

  /**
   * Cart Qty Plus
   * @param {Number} fieldName
   * @param {Number} index
   */
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
  /**
   * Cart Qty minus
   * @param {Number} fieldName
   * @param {Number} index
   */
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

  // Wishlist Add and Remove
  $scope.addwish = function(product_id, item, index) {
    var elem = angular.element(item);
    var wtype = elem.attr("data-type");
    //console.log(wtype);
    let productData = {
      product_id: product_id,
      is_bundle: false,
      wish_type: wtype
    };
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";
    if (usertoken != "") {
      getWishList
        .addWish(productData, usertoken)
        .then(function(response) {
          console.log(response);
          var res = response.data.msg;
          if (res == "success") {
            var wishvalue = wtype == "add" ? "remove" : "add";
            elem.attr("data-type", wishvalue);
            if (wishvalue == "remove") {
              elem.addClass("wishheartt");
              toastr.success(response.data.results);
            } else {
              elem.removeClass("wishheartt");
              toastr.warning(response.data.results);
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    } else {
      toastr.error("Login first to use this option");
    }
  };
});
