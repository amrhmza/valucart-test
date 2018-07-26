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
    if (phone == "") toastr.error("Phone number is required"), $("#phone").focus();
    if (email == "") toastr.error("Email is required"), $("#email").focus();
    if (username == "") toastr.error("Username is required"), $("#uname").focus();
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
