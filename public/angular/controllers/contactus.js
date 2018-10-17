app.controller("contactus", function (
    $scope,
    $rootScope,
    $location,
    $http,
    $timeout,
    $filter,
    config
) {
    var contactus = document.forms.contactus_form,
        elem = contactus.elements;

    var email_validation = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    var mobile_validation = /^[0-9]*$/;

    contactus.onsubmit = function () {
        angular.element(elem.c_name).parent().find('.error-msg').hide();
        angular.element(elem.c_about).parent().find('.error-msg').hide();
        angular.element(elem.c_email).parent().find('.error-msg').hide();
        angular.element(elem.c_mobile).parent().find('.error-msg').hide();
        angular.element(elem.c_refid).parent().find('.error-msg').hide();
        angular.element(elem.c_msg).parent().find('.error-msg').hide();

        var validation = "";

        if (elem.c_name.value == "") {
            elem.c_name.focus();
            angular.element(elem.c_name).parent().find('.error-msg').show();
            validation = 1;
        }
        if (elem.c_about.value == "") {
            elem.c_about.focus();
            angular.element(elem.c_about).parent().find('.error-msg').show();
            validation = 1;
        }
        if (elem.c_email.value == "") {
            elem.c_email.focus();
            angular.element(elem.c_email).parent().find('.error-msg').html('Please enter email id');
            angular.element(elem.c_email).parent().find('.error-msg').show();
            validation = 1;
        } else if (!email_validation.test(elem.c_email.value)) {
            elem.c_email.focus();
            angular.element(elem.c_email).parent().find('.error-msg').html('Email id is invalid');
            angular.element(elem.c_email).parent().find('.error-msg').show();
            validation = 1;
        }
        if (elem.c_mobile.value == "") {
            elem.c_mobile.focus();
            angular.element(elem.c_mobile).parent().find('.error-msg').html('Please enter mobile number');
            angular.element(elem.c_mobile).parent().find('.error-msg').show();
            validation = 1;
        } else if (!mobile_validation.test(elem.c_mobile.value)) {
            elem.c_mobile.focus();
            angular.element(elem.c_mobile).parent().find('.error-msg').html('Mobile number is invalid');
            angular.element(elem.c_mobile).parent().find('.error-msg').show();
            validation = 1;
        } else if (elem.c_mobile.value.length < 4 || elem.c_mobile.value.length > 14) {
            elem.c_mobile.focus();
            angular.element(elem.c_mobile).parent().find('.error-msg').html('Mobile number is invalid');
            angular.element(elem.c_mobile).parent().find('.error-msg').show();
            validation = 1;
        }
        if (elem.c_msg.value == "") {
            elem.c_msg.focus();
            angular.element(elem.c_msg).parent().find('.error-msg').show();
            validation = 1;
        }

        if (validation != "") {
            return false;
        } else {
            var suggestURL = config.contactus;
            let data = {
                name: elem.c_name.value,
                about: elem.c_about.value,
                email: elem.c_email.value,
                mobile: elem.c_mobile.value,
                refer_id: elem.c_refid.value,
                message: elem.c_msg.value
            };
            //let token = JSON.parse($.cookie("vcartAuth"));
            $http({
                    method: "POST",
                    url: suggestURL,
                    type: "json",
                    data: data,
                    headers: {
                        // Authorization: "Bearer " + token.token,
                        "Content-Type": "application/json"
                    }
                })
                .then(function (success) {
                    toastr.success(success.data.result);
                    $("#contactus_form")[0].reset();
                })
                .catch(function (failure) {
                    toastr.error(failure.data.error);
                });
        }

    }

})