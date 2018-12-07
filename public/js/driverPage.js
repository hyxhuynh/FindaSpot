$("#searchSubmit").on("click", function(event){
    var address = $(".address").val();
    // var spaceCover = $("#spaceCover").val().trim();
    // var spaceSize = $("#spaceSize").val().trim();
    // var price = $("#price").val().trim();

    console.log(address);

    $.ajax({
        type: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk`,
        success: function (result) {
            console.log(result);
            // Save the lat and lng as variables from the json obj returned from the google geocoder ajax call
            let newAddressLat = result.results[0].geometry.location.lat;
            let newAddressLng = result.results[0].geometry.location.lng;
            console.log("New spotLat: ", newAddressLat, " New spot Lng: ", newAddressLng);
            $.get(`http://localhost:3000/api/parkingspace?lat=${newAddressLat}&long=${newAddressLng}`)
                .then(function(data){
                    console.log("DATA: ", data);
                });
        }
    });
});