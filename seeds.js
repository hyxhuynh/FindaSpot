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

// Force drop of existing tables
var syncOptions = { force: true };

// Drop Reservations first due to foreign key constraints
db.Reservation.drop();
// Sync ParkingSpace model - WARNING: existing data will be dropped!!
db.ParkingSpace.sync(syncOptions).then(function() {
    // Make parking spaces for each set of coordinates
    for (set of coordinates) {
        let newSpace = {
            ownerId: 1,
            address: "N/A",
            latitude: set.lat,
            longitude: set.lng,
            spaceSize: "standard",
            spaceCover: "uncovered",
            price: 0,
            description: "Not available"
        };

        db.ParkingSpace.create(newSpace);
    }

    db.Reservation.sync(syncOptions).then( () =>{
        let newRes = {
            reservationStart: new Date(),
            reservationEnd: new Date(),
            parkerId: 1,
            ParkingSpaceId: 1
        };
        db.Reservation.create(newRes);
    });

});

