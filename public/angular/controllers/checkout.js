app.controller("checkout", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  addNewAddress
) {
  $scope.disabled = "";
  $scope.address_id = "";
  $scope.addresschange = function(data) {
    $scope.address_id = data;
  };
  addNewAddress
    .getlist()
    .then(function(response) {
      $scope.addresslist = response.data.results.response;
    })
    .catch(function(response) {
      console.log(response);
    });
  $scope.onloadFOrmElement = function() {
    var cp = document.forms.newAddress;
    var elem = cp.elements;

    cp.onsubmit = function() {
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
          .then(function(response) {
            var res = response.data.results;
            userData["a_id"] = res;
            $scope.addresslist.push(userData);
            toastr.success("Address added successfully!");
            $('form[name="newAddress"]').each(function() {
              this.reset();
            });
            $("#add_address").trigger("click");
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    };
  };
});
