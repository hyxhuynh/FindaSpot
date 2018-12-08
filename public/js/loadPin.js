// Makes a new HTML card for a ParkingSpace
function makeParkingSpaceCard(spaceData) {
    const address = spaceData.address;

    // Setup main card container
    let card = $("<div>").addClass("panel spaceCard");

    // Create header with address
    let header = $("<div>").addClass("panel-heading spaceCard-header")
        .text(address);
    card.append(header);

    // Create card body
    let body = $("<div>").addClass("panel-body");
    card.append(body);

    // Add image to body
    let spaceImg = $("<img>").addClass("spaceCard_img")
        .attr("src",`https://maps.googleapis.com/maps/api/streetview?parameters&size=200x150&fov=50&location=${address}&key=AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk`);
    body.append(spaceImg);

    // Add reserve button to body
    let reserveButton = $("<button>").addClass("spaceCard_reserveBtn")
        .text("Reserve")
        .data("id", spaceData.id);
    body.append(reserveButton);

    // Add tags to body
    let tagDiv = $("<div>");
    tagDiv.append( $("<span>").addClass("spaceCard_tag").text(spaceData.spaceSize) );
    tagDiv.append( $("<span>").addClass("spaceCard_tag").text(spaceData.spaceCover) );
    tagDiv.append( $("<span>").addClass("spaceCard_tag").text(`$${spaceData.price.toFixed(2)}`) );
    body.append(tagDiv);

    return card;
}

// Refreshes ParkingSpace card display area with provided data
function displaySpaceCards(data) {
    // Clear all existing cards
    $("#aviSpotsTable").empty();

    // Make a new card for each space data entry
    data.forEach(spaceData => {
        $("#aviSpotsTable").append(makeParkingSpaceCard(spaceData));
    });
}


$(document).ready( function () {
    console.log("Linked to pin page");

    // Function to Add markers from database to google map
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

    }

    // Grab the users current geoLocation
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
        var userLat = currentPosition.coords.latitude;
        var userLng = currentPosition.coords.longitude;
        console.log("Current location ",userLat, userLng);
        // Now take the console.log lat and lng and put it into the get request
        // USE api route to pull all parking spaces 1 lat and lng away from the users current geolocation node
        var url = `/api/parkingspace?lat=${userLat}&long=${userLng}`;
        $.ajax({
            type: "GET",
            url: url
        }).then(function (data) {
            console.log("data ", data);
            console.log("firstSpotLat: ", data[0].latitude, "FirstSpotLng: ", data[0].longitude);

            for (let i = 0; i < data.length; i++) {
                // Add pins to map
                addMarker(data[i]);
            }

            // Create cards for parking spaces and add to card area
            displaySpaceCards(data);

        });

    });
});

$(document).on("click",".spaceCard_reserveBtn", function() {
    console.log("clicked",$(this).data());
    window.location.href = "/reservespace";
});