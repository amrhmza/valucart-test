app.controller("update_profile", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  updateProfile
) {
  //Profile Update//
  var cp = document.forms.profileForm,
    elem = cp.elements;
  cp.onsubmit = function() {
    var a = 0;
    if (!elem.user_name.value) {
      toastr.error("Name is required");
      elem.name.focus();
      a = 1;
    }
    if (!elem.user_email.value) {
      toastr.error("Email is Required");
      elem.email.focus();
      a = 1;
    }
    if (!elem.mobile.value) {
      toastr.error("Mobile Number is Required");
      elem.mobile.focus();
      a = 1;
    }
    /* 
    if (!elem.address.value) {
      toastr.error("Address is Required");
      elem.address.focus();
      a = 1;
    }    
    if (!elem.postalcode.value) {
      toastr.error("");
      elem.postalcode.focus();
      a = 1;
    }
    if (!elem.city.value) {
      toastr.error("");
      elem.city.focus();
      a = 1;
    } */

    if (a == 1) {
      return false;
    } 
    else {
      var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
      var userid= (userAuth!="")?userAuth.user_id: "";

      let userData = {
        id: userid,
        username: elem.user_name.value,
        user_email: elem.user_email.value,
        user_mobile: elem.mobile.value,
        user_address: elem.address.value,
        postal_code: elem.postalcode.value,
        city: elem.city.value,
      };
      

      updateProfile
      .update_profile(userData, userid)
      .then(function(response) {
        //console.log(response);
        var res= response.data.results;
        toastr.success(response.data.results);
      })
      .catch(function(response) {
        console.log(response);
      });
    }
  };
});
