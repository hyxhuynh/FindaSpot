var db = require("../models");
var auth = require("../auth/util");
module.exports = function(app) {
    // Render splash/options page
    app.get("/", auth.isLoggedIn, function(req, res) {
        res.render("chooseProfile");
    });
    //Render owner's profile page
    app.get("/ownerProfile", auth.isLoggedIn, function(req, res) {
        const user = req.user;
        const id = user.id;
        db.ParkingSpace.findAll({
            where: {ownerId:id}
        }).then( response => {
            console.log(response);
            res.render("ownerProfile", {parkingSpaces: response});
        });
    });

    //Render driver's profile page
    app.get("/driverProfile", auth.isLoggedIn, function(req, res) {
        const user = req.user;
        const id = user.id;
        db.Reservation.findAll({
            where: { parkerId: id },
            include: [ {
                model: db.user,
                as: "parker"
            }, {
                model: db.ParkingSpace,
                include: [ { model: db.user, as: "owner" }]
            }]
        }).then( response => {
            console.log(response);
            res.render("driverProfile", {reservations: response});
        });
    });

    // Render Driver Application page
    app.get("/googleMapsPage", function(req, res) {
        res.render("googleMaps");
    });

    // Render page to make reservation on space
    // Driver can pick the dates and time
    app.get("/reservation", function (req, res) {
        res.render("driverApplication");
    });

    // Render Reservation Confirmation  page
    app.get("/reservation/confirmation", function (req, res) {
        var query = req.query;
        db.ParkingSpace.findOne({
            where: { id: query.parkingSpaceId },
            include: [ { model: db.user, as: "owner" } ]
        }).then( response => {
            res.render("reservationConfirmation", {
                ownerFirstName: response.owner.firstname,
                ownerLastName: response.owner.lastname,
                ownerEmail: response.owner.email,
                reservationStart: query.reservationStart,
                reservationEnd: query.reservationEnd,
                arrivalTime: query.arrivalTime,
                leavingTime: query.leavingTime,
                parkingSpaceId: query.parkingSpaceId
            });
        });
    });

    // Render Owner Application page
    app.get("/owner/application", auth.isLoggedIn, function(req, res) {
        res.render("ownerApplication");
    });


    // Render Owner Confirmation/Summary page
    app.get("/owner/confirmation", function(req, res) {
        console.log("REQ.QUERY", req.query);
        res.render("ownerConfirmation", {
            address: req.query.address,
            price: req.query.price,
            spaceCover: req.query.spaceCover,
            spaceSize: req.query.spaceSize,
            description: req.query.description
        });
    });

    // Render Our story page
    // User does not need to login
    app.get("/ourStory", function(req, res) {
        res.render("ourStory");
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });

};
