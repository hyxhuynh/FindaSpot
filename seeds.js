const db = require("./models");

// Coordinates for testing
const coordinates = [
    {lat:47.612667, lng: -122.322600},
    {lat:47.608333, lng: -122.335259},
    {lat:47.613095, lng: -122.336430},
    {lat:47.606840, lng: -122.338220},
    {lat:47.608700, lng: -122.333750},
    {lat:47.607480, lng: -122.335200}
];

// Force drop of existing table
var syncOptions = { force: true };

// Sync ParkingSpace model - WARNING: existing data will be dropped!!
db.ParkingSpace.sync(syncOptions).then(function() {
    // Make parking spaces for each set of coordinates
    for (set of coordinates) {
        let newSpace = {
            ownerID: 1,
            address: "N/A",
            latitude: set.lat,
            longitude: set.lng,
            spaceSize: "standard",
            spaceCover: "uncovered",
            price: 0,
            description: "Not available"
        }

        db.ParkingSpace.create(newSpace);
    }
});