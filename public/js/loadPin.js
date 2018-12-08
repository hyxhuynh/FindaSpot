$(document).ready( function () {
    console.log("Linked to pin page")
    function addMarker(spot) {
        var marker = new google.maps.Marker({
            position: {lat: spot.latitude, lng: spot.longitude },
            map: map,
            icon: "https://maps.gstatic.com/mapfiles/ms2/micons/parkinglot.png"
        });
        // Check if needs different iconImage vs defult setIcon to props.icon link
        if (spot.icon) {
            // set icon image
            marker.setIcon(props.icon);
        }
        // Check if needs content with marker
        if (spot.description) {
            var infowindow = new google.maps.InfoWindow({
                content: spot.description});
        }
        // On click of marker display infoWindow
        marker.addListener("click",function () {
            infowindow.open(map, marker);
        });

    };
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
            console.log("firstSpotLat: ", data[0].latitude, "FirstSpotLng: ", data[0].longitude);

            for (let i = 0; i < data.length; i++) {
                addMarker(data[i]);
                
            }
        
            // now take the data returned from the API and and add those pins to the map

            // address: "1457 7th Avenue, Seattle, WA, USA"
            // createdAt: "2018-12-06T22:35:18.000Z"
            // description: "none"
            // distance: 15.203535717874976
            // id: 7
            // latitude: 47.6110295
            // longitude: -122.33293
            // ownerId: 1
            // price: 15
            // spaceCover: "uncovered"
            // spaceSize: "compact"
            // updatedAt: "2018-12-06T22:35:18.000Z"

        });

    });
});

    