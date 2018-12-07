$(document).ready( function () {
    console.log("Linked to pin page")
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
        var userLat = currentPosition.coords.latitude;
        var userLng = currentPosition.coords.longitude;
        console.log("Current location ",userLat, userLng);
        // Now take the console.log lat and lng and put it into the get request
        // USE api route to pull all parking spaces 1 lat and lng away from the users current geo locationnode 
        var url = "/api/parkingspace?";
        var lat = `lat=${userLat}`;
        var lng = `&long=${userLng}`;
        $.ajax({
            type: "GET",
            url: url + lat + lng
        }).then(function (data) {
            console.log("data ", data);
            // now take the data returned from the API and and add those pins to the map

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

        });

    });
});