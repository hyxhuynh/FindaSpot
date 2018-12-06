// ================ GLOBAL VARIABLES ================

var currentTab = 0; // Current tab is set to be the first tab (0)

// ================ FUNCTIONS ================
// Function to deal with validation of the form fields
function validateForm() {

    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value === "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

// Function to remove the "active" class of all steps...
function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n);
}

// This function flagged by ESLint as the function is not used in this file
// The function is used in the HTML files
// Function to figure out which tab to display
function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) {
        return false;
    }
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        // document.getElementById("regForm").submit();
        $("#regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

showTab(currentTab); // Display the current tab

// ================ EVENT LISTENER ================

$("#regForm").on("submit", function (event) {
    let form = $(this);
    event.preventDefault();
    console.log("FORM SUBMITTED");

    var input = document.getElementById("autocomplete");
    var userAddress = input.value;
    $.ajax({
        type: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk`
    }).then(result => {
        console.log(result);
        // Save the lat and lng as variables from the json obj returned from the google geocoder ajax call
        newAddressLat = result.results[0].geometry.location.lat;
        newAddressLng = result.results[0].geometry.location.lng;
        console.log("New spotLat: ", newAddressLat, " New spot Lng: ", newAddressLng);

        const postURL = "/api/parkingspace";
        let newSpace = {
            ownerId: 1, // Placeholder, needs to get ID of submitting user
            address: form.find("[name=address]").val(),
            latitude: newAddressLat,
            longitude: newAddressLng,
            spaceSize: form.find("[name=spaceSize]:checked").val(),
            spaceCover: form.find("[name=spaceCover]:checked").val(),
            price: form.find("[name=price]").val(),
            description: form.find("[name=description]").val()
        };
        $.post(postURL, newSpace).then(response => {
            console.log("RESPONSE FROM PARKINGSPACE POST REQUEST");
            console.log(response);
            console.log(response.redirect);

            // window.location.href = "/owner/confirmation";
        });
    });


});


