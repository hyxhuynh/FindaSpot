// Authentication form js
$(function() {
    $("#login-form-link").click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $("#register-form-link").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
    });
    $("#register-form-link").click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#login-form-link").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
    });
    //modal js
    $( "button[data-dismiss='modal']" ).click(function(e){
        $(e.target).closest(".modal").removeClass("show");//hides the modal when close buttons are clicked
    });
});

//check if user password matches the password in the confirm field
$("#register-form").submit(function(e){
    var pass1= $("#register-form input[name='password']").val(); //grabs the value of password in register form password field
    var pass2 = $("#register-form input[name='confirm-password']").val(); //grabs the value of confirm-password in register confirm password form field
    console.log(pass1);
    console.log(pass2);
    if (pass1 !== pass2){ //checks values
        e.preventDefault(); //prevents submission of form
        $("#problemModal").addClass("show"); //shows modal
        $(".modal-body").append("<p id='modalText'></p>"); //appends a p tag
        $("#modalText").append("Password and Confirm Password don't match"); //gives value to p tag
    }
});
