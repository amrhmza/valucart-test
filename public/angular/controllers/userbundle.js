app.controller("userbundle", function(
  $scope,
  $rootScope,
  $location,
  $window,
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
      $scope.mybundle = response.data.results.response.product;
      $scope.mybundle_dates = response.data.results.response;
      $scope.mybundle_name = response.data.results.response.ub_name;
      $scope.ub_id = response.data.results.response.ub_id;
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
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal + 1
      );
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }

    $scope.cartTotal();
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function(fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal - 1;
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
    $scope.cartTotal();
  };

  $scope.cartTotal = function() {
    var subtotal = 0,
      savingstotal = 0;
    angular.forEach(angular.element(".productcount"), function(value, key) {
      var a = angular.element(value);
      subtotal +=
        parseFloat(a.attr("data-price")) * parseFloat(a.attr("data-qty"));
      savingstotal +=
        parseFloat(a.attr("data-savings")) * parseFloat(a.attr("data-qty"));
    });
    var delivery_price = parseInt(15);
    var grandtotal = parseFloat(subtotal) + parseFloat(delivery_price);
    $(".subTotal").html(subtotal + " AED");
    $(".savingsTotal").html(subtotal + " AED");
    $(".grandTotal").html(grandtotal + " AED");
    $scope.grandTotal = grandtotal;
  };

  $scope.change_title = function() {
    if ($scope.edit_title == 0) {
      $scope.edit_title = 1;
    } else {
      $scope.edit_title = 0;
    }
  };

  //user_bundle Update//
  var cp = document.forms.user_bundle,
    elem = cp.elements;
  cp.onsubmit = function() {
    console.log(elem);

    let product_ids = [];
    let proceed = 0;
    $scope.mybundle.forEach(element => {
      //console.log(element.ubp_id);
      if ($("#brand_" + element.ubp_id).is(":checked") == true) {
        proceed = 1;
        let bundle_data = [];
        if (element.ubp_p_is_bundle == 1) {
          element.product.forEach(ele => {
            let bd = {
              pd_id: ele.ubbp_pd_id,
              is_alternative: ele.ubbp_is_alternative
            };
            bundle_data.push(bd);
          });
        }
        let data = {
          product_id: element.ubp_pd_id,
          quantity: $("input[name=qty_" + element.ubp_id + "]").val(),
          is_bundel: element.ubp_p_is_bundle,
          bundel_items: bundle_data
        };
        element.quantity = $("input[name=qty_" + element.ubp_id + "]").val();
        product_ids.push(data);
      }
    });
    let editdata = {
      bundle_name: $scope.mybundle_name,
      ub_id: $scope.ub_id,
      product_ids: product_ids
    };
    if (proceed == 1) {
      userbundle
        .editBundle(editdata)
        .then(function(response) {
          var res = response.data.results;
          if (res.msg == "success") {
            toastr.success("Update Successfully..!");
            $window.location.href = "/mybundles";
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    } else {
      toastr.warning("Product should not be empty..!");
    }
  };
});
