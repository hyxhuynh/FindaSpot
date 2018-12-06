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