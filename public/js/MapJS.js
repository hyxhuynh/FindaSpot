console.log("Linked to mapJS");

// Google maps API key
// var mapAPIkey = AIzaSyAcHE7ZaBAeXI9teNooIxDRRcj4pjZprUw
// var geoLocationAPI = AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk

var map;

// Gather the users current geolocation and display that lat and lng as the starting map location

function initMap() {
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
        var userLat = currentPosition.coords.latitude;
        var userLng = currentPosition.coords.longitude;
        console.log("Initmap startin coords: ",userLat, userLng);
        var options = {
            zoom: 13,
            center: {lat: userLat, lng: userLng}
        };
        map = new google.maps.Map(document.getElementById("map"), options);
    });
}

// Code for the address input box
function initAutocomplete() {
    console.log("Trying to auto complete");
    var input = document.getElementById("autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
}