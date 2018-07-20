$(function() {
  /**
   * Email validation
   */
  $("#email").on("keyup", function () {
    var e_mail = this.value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var ev = emailPattern.test(e_mail);
    if(ev==false) $(this).css('color','red');
    else $(this).css('color','initial');
});
/**
 * Register function
 */
  $("#register-form").submit(function(e) {
    e.preventDefault();
    var username = $("#uname").val();
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    var phone = $("#phone").val();
    if (username == "") $("#uname").parent(".form-group").addClass("has-error");
         else $("#uname").parent(".form-group").removeClass("has-error");
    if (email == "") $("#email").parent(".form-group").addClass("has-error");
        else $("#email").parent(".form-group").removeClass("has-error");
    if (pwd == "") $("#pwd").parent(".form-group").addClass("has-error");
        else $("#pwd").parent(".form-group").removeClass("has-error");
    if (phone == "") $("#phone").parent(".form-group").addClass("has-error");
        else $("#phone").parent(".form-group").removeClass("has-error");
        if(username!=''&&email!=''&&pwd!=''&&phone!=''){
      $.ajax({
        type: 'POST',
        data: JSON.stringify({username: username, password: pwd, user_phone_no: phone, user_email: email, user_first_name: "", user_last_name: "", user_city: "", user_area: ""}),
        contentType: 'application/json',
        url: "http://18.191.0.240:3000/auth/register",
        success: function(response) {
          if(response.status=="success"){
            $('#register-form-link').removeClass('active');
            $('#login-form-link').addClass('active');
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
          }
        }, error: function(error){
            $("#reg_error").html(error.responseJSON.error);
        }
      });      
    } else {
      return false;
    }
  });
});
