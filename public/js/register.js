/**
 * Email validation function
 */
function validate_email(email) {
  // var e_mail = this.value;
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var ev = emailPattern.test(email);
  console.log(ev);
  return ev;
}
$(function() {
  /**
   * Email validation
   */
  // $("#email").on("keyup", function() {
  //   var e_mail = this.value;
  //   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   var ev = emailPattern.test(e_mail);
  //   if (ev == false) $(this).css("color", "red");
  //   else $(this).css("color", "initial");
  // });
  /**
   * Register function
   */
  $("#register-form").submit(function(e) {
    e.preventDefault();
    var username = $("#uname").val();
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    var phone = $("#phone").val();
    var valid_email = validate_email(email);
    if (pwd == "") toastr.error("Password is required"), $("#pwd").focus();
    if (phone == "")
      toastr.error("Phone number is required"), $("#phone").focus();
    if (email == "") toastr.error("Email is required"), $("#email").focus();
    if (username == "")
      toastr.error("Username is required"), $("#uname").focus();
    if (email != "" && valid_email == false) {
      toastr.error("Invalid email");
      $("#email").focus();
      return false;
    }
    if (username != "" && email != "" && pwd != "" && phone != "") {
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          username: username,
          password: pwd,
          user_phone_no: phone,
          user_email: email,
          user_first_name: "",
          user_last_name: "",
          user_city: "",
          user_area: ""
        }),
        contentType: "application/json",
        url: "http://18.191.0.240:3000/auth/register",
        success: function(response) {
          if (response.status == "success") {
            $("#register-form input").val("");
            toastr.success("Registered Successfully");
            $("#register-form-link").removeClass("active");
            $("#login-form-link").addClass("active");
            $("#login-form")
              .delay(100)
              .fadeIn(100);
            $("#register-form").fadeOut(100);
          }
        },
        error: function(error) {
          toastr.error(error.responseJSON.error);
        }
      });
    } else {
      return false;
    }
  });
});
window.fbAsyncInit = function() {
  // FB JavaScript SDK configuration and setup
  FB.init({
    appId: "195383424669976", // FB App ID
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: "v3.1" // use graph api version 2.8
  });

  // Check whether the user already logged in
  FB.getLoginStatus(function(response) {
    if (response.status === "connected") {
      //display user data
      // getFbUserData();
    } else {
      console.log(response);
    }
  });
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// Facebook login with JavaScript SDK
function fbLogin() {
  FB.login(
    function(response) {
      if (response.authResponse) {
        console.log(response.authResponse);
        // Get and display the user profile data
        getFbUserData();
      } else {
        document.getElementById("status").innerHTML =
          "User cancelled login or did not fully authorize.";
      }
    },
    { scope: "email" }
  );
}

// Fetch the user profile data from facebook
function getFbUserData() {
  FB.api(
    "/me",
    {
      locale: "en_US",
      fields: "id,first_name,last_name,email,link,gender,locale,picture"
    },
    function(response) {
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          username: response.first_name,
          password: response.id,
          user_phone_no: "",
          user_email: response.email,
          user_first_name:response.first_name,
          user_last_name: response.last_name,
          user_city: "",
          user_area: ""
        }),
        contentType: "application/json",
        url: "http://18.191.0.240:3000/auth/register",
        success: function(response) {
          if (response.status == "success") {
            $("#register-form input").val("");
            toastr.success("Registered Successfully");
            $("#register-form-link").removeClass("active");
            $("#login-form-link").addClass("active");
            $("#login-form")
              .delay(100)
              .fadeIn(100);
            $("#register-form").fadeOut(100);
          }
        },
        error: function(error) {
          toastr.error(error.responseJSON.error);
        }
      });
      console.log(response);
    }
  );
}

// Logout from facebook
function fbLogout() {
  FB.logout(function() {
    document.getElementById("fbLink").setAttribute("onclick", "fbLogin()");
    document.getElementById("fbLink").innerHTML = '<img src="fblogin.png"/>';
    document.getElementById("userData").innerHTML = "";
    document.getElementById("status").innerHTML =
      "You have successfully logout from Facebook.";
  });
}
