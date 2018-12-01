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
    // Gather the users current geolocation and display that lat and lng as the starting map location
var map;
function initMap() {
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
        var userLat = currentPosition.coords.latitude;
        var userLng = currentPosition.coords.longitude;
        console.log(userLat, userLng);
        var options = {
            zoom: 13,
            center: {lat: userLat, lng: userLng}
        };
        map = new google.maps.Map(document.getElementById("map"), options);

        function addMarker(props) {
            console.log("running");
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
        // loop throw array of markers and run addMarker function on each object in markers array
        for (i = 0; i < markers.length; i++) {
            addMarker(markers[i]);
        }
    });
}
// Code for the address input box

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
            url: "https://maps.googleapis.com/maps/api/geocode/json?address="+userAddress+"&key=AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk"

        }).then(function (result) {
            console.log(result);
        });
    });

}

