$(document).ready( function () {
    console.log("Linked to pin page")
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
        var userLat = currentPosition.coords.latitude;
        var userLng = currentPosition.coords.longitude;
        console.log("Current location ",userLat, userLng);
        // Now take the console.log lat and lng and put it into the get request
        $.ajax({
            type: "GET",
            url: url + lat + lng
        }).then(function (data) {
            console.log("data ", data);
        });

    });
});