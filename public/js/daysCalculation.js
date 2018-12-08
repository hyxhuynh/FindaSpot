// Moment.js
var today = moment();
console.log(today);
console.log(today.toString());
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.datepicker');
//     var instances = M.Datepicker.init(elems, options);
//   });

// Or with jQuery

$(document).ready(function(){
    $(".datepicker").datepicker({
        minDate: new Date(today)
    });
    $(".timepicker").timepicker();
});