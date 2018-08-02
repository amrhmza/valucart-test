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

  //user_bundle Update//
  var cp = document.forms.user_bundle,
    elem = cp.elements;
  cp.onsubmit = function() {
    let product_ids = [];
    $scope.mybundle.forEach(element => {
      console.log(element.ubp_id);
      if ($("#brand_" + element.ubp_id).is(":checked") == true) {
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
    userbundle
      .editBundle(editdata)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
  };
});
