console.log("Linked");

//Google maps API key


// Google maps API key

// var mapAPIkey = AIzaSyAcHE7ZaBAeXI9teNooIxDRRcj4pjZprUw
// var geoLocationAPI = AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk
// Array of markers
var markers =[
    {coords: {lat:47.612667, lng: -122.322600}, content: "<h6>Status: Available<br>Location: Apt parking <br>Max usage: 72 hours</h6>"},

    {coords: {lat:47.608333, lng: -122.335259},
        content: "<h6>Status: Available<br>Location: Garage parking <br>Max usage: 24 hours</h6>"},

    {coords: {lat:47.613095, lng: -122.336430},
        content: "<h6>Status: Not available<br>Location: Apt parking <br>Max usage: 48 hours</h6>"},

    {coords: {lat:47.606840, lng: -122.338220},
        content: "<h6>Status: Not available<br>Location: Apt parking <br>Max usage: 48 hours</h6>"},

    {coords: {lat:47.608700, lng: -122.333750},
        content: "<h6>Status: Not available<br>Location: Apt parking <br>Max usage: 48 hours</h6>"},

    {coords: {lat:47.607480, lng: -122.335200},
        content: "<h6>Status: Not available<br>Location: Apt parking <br>Max usage: 48 hours</h6>"}
];



var map;
//Add a marker from the markers array above
function addMarker(props) {
    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        icon: "https://maps.gstatic.com/mapfiles/ms2/micons/parkinglot.png"
    });

    // Check if needs different iconImage vs defult setIcon to props.icon link
    if (props.icon) {
        // set icon image
        marker.setIcon(props.icon);
    }
    // Check if needs content with marker
    if (props.content) {
        var infowindow = new google.maps.InfoWindow({
            content: props.content });
    }
    // On click of marker display infoWindow
    marker.addListener("click",function () {
        infowindow.open(map, marker);
    });
}

// Gather the users current geolocation and display that lat and lng as the starting map location

function initMap() {
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
        var userLat = currentPosition.coords.latitude;
        var userLng = currentPosition.coords.longitude;
        console.log("Initmap ",userLat, userLng);
        var options = {
            zoom: 13,
            center: {lat: userLat, lng: userLng}
        };
        map = new google.maps.Map(document.getElementById("map"), options);

        // loop throw array of markers and run addMarker function on each object in markers array
        for (i = 0; i < markers.length; i++) {
            addMarker(markers[i]);
        }
    });
}

// Code for the address input box

var newAddressLat;
var newAddressLng;

function initAutocomplete() {
    var input = document.getElementById("autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
    $("#addressButton").on("click", function(event) {
        event.preventDefault();
        console.log(input.value);
        var userAddress = input.value;

        // AJAX call for google geolocator converter

        $.ajax({
            type: "GET",
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk`
        }).then(function (result) {
            // Save the lat and lng as variables from the json obj returned from the google geocoder ajax call
            newAddressLat = result.results[0].geometry.location.lat;
            newAddressLng = result.results[0].geometry.location.lng;
            console.log("Lat: ", newAddressLat, " Lng: ", newAddressLng);
            // Create an obj with the coords and info from the create spot form and push that obj to the database/arrry so that it can be passed
            // into the addMarker function
            var url = "/api/parkingspace?";
            var lat = `lat=${newAddressLat}`;
            var lng = `&long=${newAddressLng}`;

            $.post({
                url: "/api/parkingspace",
                data: {}; // get information from user model and post that information to the database.
            });
            // $.ajax({
            //     type: "GET",
            //     url: url + lat + lng
            // }).then(function (data) {
            //     console.log("data ", data);
            // }); 
            var newMarker = {coords: {lat: newAddressLat, lng: newAddressLng},
                content: "<h6>That new pin though :)</h6>"};
            // push new marker obj to the arry of markers
            markers.push(newMarker);

            console.log(markers);
            // Reload map with new markers
            initMap();

        });
    });
}


