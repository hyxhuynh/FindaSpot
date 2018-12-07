var db = require("../models");
var auth = require("../auth/util");
module.exports = function(app) {
    // Render Driver Application page
    app.get("/", auth.isLoggedIn, function(req, res) {
        res.render("chooseProfile");
    });
    //Render profile page
    app.get("/ownerProfile", auth.isLoggedIn, function(req, res) {
        res.render("ownerProfile");
    });

    // Render Driver Application page
    app.get("/driver/application", function(req, res) {
        res.render("driverApplication");
    });

    // TODO:
    // Render Maps page
    app.get("/googleMapsPage", function(req, res) {
        db.ParkingSpace.findAll({}).then(function(dbParkingSpaces) {
            res.render("googleMaps", {
                spaces: dbParkingSpaces,
            });
        });
    });

    // Load space details page and pass in a parking spot by id
    app.get("/googleMapsPage/:id", function(req, res) {
        db.ParkingSpace.findOne({ where: { id: req.params.id } }).then(function(dbParkingSpaces) {
            res.render("googleMaps", {
                spaces: dbParkingSpaces
            });
        });
    });


    // Render Owner Application page
    app.get("/owner/application", function(req, res) {
        res.render("ownerApplication");
    });

    // Render Owner Application page
    app.get("/owner/confirmation", function(req, res) {
        console.log("REQ.QUERY", req.query);
        res.render("ownerConfirmation", {
            address: req.query.address,
            price: req.query.price,
            spaceCover: req.query.spaceCover,
            spaceSize: req.query.spaceSize,
            description: req.query.description,
            ownerName: req.query.ownerName,
            ownerPhone: req.query.ownerPhone,
            ownerEmail: req.query.ownerEmail
        });
    });


    // Load example page and pass in an example by id
    app.get("/example/:id", auth.isLoggedIn, function(req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
            res.render("example", {
                example: dbExample,
                loggedIn: true
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });

};
