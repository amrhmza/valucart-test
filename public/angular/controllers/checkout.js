app.controller("checkout", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  addNewAddress,
  cart,
  cartData
) {
  $scope.applied = 1;
  $scope.qty = 1;
  $scope.disabled = "";
  $scope.address_id = "";
  $scope.cartGrand = parseFloat(cartData.cartSum.toFixed(2));
  $scope.subTotal = parseFloat(cartData.cartSum.toFixed(2));
  console.log($scope.cartGrand);
  $scope.addresschange = function (data) {
    $scope.address_id = data;
  };
  addNewAddress
    .getlist()
    .then(function (response) {
      var addArr = response.data.results.response;
      var addlist = [];
      var no = 0;
      angular.forEach(addArr, function (value, key) {
        if (value.a_name && value.a_phone && value.a_address_1) {
          addlist.push(value);
        }
      });
      $scope.addresslist = addlist;
      console.log($scope.addresslist);
    })
    .catch(function (response) {
      console.log(response);
    });
  $scope.onloadFOrmElement = function () {
    var cp = document.forms.newAddress;
    var elem = cp.elements;

    cp.onsubmit = function () {
      $(".loader").removeClass("hidden");
      console.log(elem.is_default.checked);

      var a = 0;
      if (!elem.address_name.value) {
        toastr.error("Name is required");
        elem.address_name.focus();
        a = 1;
      }
      if (!elem.phone_no.value) {
        toastr.error("Phone Number is Required");
        elem.phone_no.focus();
        a = 1;
      }

      if (!elem.flat.value) {
        toastr.error("FLAT/HOUSE/FLOOR/BUILDING is Required");
        elem.flat.focus();
        a = 1;
      }
      if (!elem.street.value) {
        toastr.error("STREET/LOCALITY");
        elem.street.focus();
        a = 1;
      }
      if (!elem.city.value) {
        toastr.error("City is Required");
        elem.city.focus();
        a = 1;
      }
      if (!elem.postalcode.value) {
        toastr.error("ZIP is Required");
        elem.postalcode.focus();
        a = 1;
      }

      if (a == 1) {
        $(".loader").addClass("hidden");
        return false;
      } else {
        var userAuth = typeof $.cookie("vcartAuth")
          ? JSON.parse($.cookie("vcartAuth"))
          : "";
        var userToken = userAuth != "" ? userAuth.token : "";

        let userData = {
          a_id: "",
          a_name: elem.address_name.value,
          a_phone: elem.phone_no.value,
          a_address_1: elem.flat.value,
          a_address_2: elem.street.value,
          a_city: elem.city.value,
          a_pincode: elem.postalcode.value,
          a_is_default: elem.is_default.checked
        };
        addNewAddress
          .add_address(userData, userToken)
          .then(function (response) {
            var res = response.data.id;
            userData["a_id"] = res;
            $scope.addresslist.push(userData);
            toastr.success("Address added successfully!");
            $('form[name="newAddress"]').each(function () {
              this.reset();
            });
            $("#collapse2").removeClass("in");
            if ($scope.address_id != "") {
              $(".bill.pay").trigger("click");
            }
            // $("#add_address").trigger("click");
            $(".loader").addClass("hidden");
            $scope.continuebtn();
          })
          .catch(function (response) {
            $(".loader").addClass("hidden");
            console.log(response);
          });
      }
    };
  };
  $scope.verifyToken = function (coupon) {
    // $(".loader").removeClass("hidden");
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";
    cart
      .verifyCoupon(coupon, $scope.cartGrand, usertoken)
      .then(function (response) {
        $(".loader").addClass("hidden");
        if (response.status == 200) {
          toastr.success("Coupon valid and applied");
          let data = response.data.results;
          $scope.applied = 0;
          $scope.couponInfo = data.msg;
          $scope.cartGrand = Number(parseFloat(data.response.discounted_price).toFixed(2));
          console.log($scope.cartGrand)
          $scope.cartsaving = parseFloat(data.response.discount).toFixed(2);
        } else {
          toastr.info("Coupon not valid");
        }
      })
      .catch(function (response) {
        // $(".loader").addClass("hidden");
        let data = response.data.error;
        toastr.info(data.msg);
      });
  };
  $scope.removeCoupon = function () {
    $scope.cartGrand =
      parseFloat(Number($scope.cartGrand) + Number($scope.cartsaving) + Number(15)).toFixed(2);
    console.log($scope.cartGrand);
    delete $scope.cartsaving;
    $scope.applied = 1;
    $scope.coupon = "";
  };
  $scope.ctnpay = function () {
    if ($scope.address_id != "") {
      $(".bill.pay").trigger("click");
    } else {
      toastr.error("Please Select the address");
    }
  };
  // };

  $scope.savecontinue = function () {
    $("#collapse2").removeClass("in");
    $(".btncontinue").removeClass("hide");
    $(".btnsc").addClass("hide");
    var d = $("#collapse1").hasClass("in");
  };
  $scope.continuebtn = function () {
    $("#collapse1").removeClass("in");
    $(".btncontinue").addClass("hide");
    $(".btnsc").removeClass("hide");
    var c = $("#collapse2").hasClass("in");
    if (c == true) {
      $(".btncontinue").removeClass("hide");
      //check address form filled
      if ($("#address_name").val() != "") {
        $("#newAddress_submit").trigger("click");
        // addnewaddress()
      } else {
        toastr.error("Please Select the address");
      }
    }
  };
});
