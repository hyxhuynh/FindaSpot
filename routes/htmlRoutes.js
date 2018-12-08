var db = require("../models");
var auth = require("../auth/util");
module.exports = function(app) {
    // Render splash/options page
    app.get("/", auth.isLoggedIn, function(req, res) {
        res.render("chooseProfile");
    });
    //Render profile page
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

    // Render Driver Application page
    // app.get("/driver/application", function(req, res) {
    //     res.render("driverApplication");
    // });

    // Render Driver Application page
    app.get("/googleMapsPage", function(req, res) {
        res.render("googleMaps");
    });

    // Render page to make reservation on space
    app.get("/reservespace", function (req, res) {
        res.render("driverApplication");
    });

    app.get("/reservespace/confirmation", function (req, res) {
        res.render("reservationConfirmation");
    });

    // Render Owner Application page
    app.get("/owner/application", auth.isLoggedIn, function(req, res) {
        res.render("ownerApplication");
    });

    // Render Our story page
    // User does not need to login
    app.get("/ourStory", function(req, res) {
        res.render("ourStory");
    });
    // Render Owner Confirmation/Summary page
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

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });

};
