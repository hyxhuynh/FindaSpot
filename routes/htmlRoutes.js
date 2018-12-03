var db = require("../models");
var auth = require("../auth/util");
module.exports = function(app) {
    // Load index page
    app.get("/", auth.isLoggedIn, function(req, res) {
        res.render("index", {
            msg: "Welcome!",
            examples: null,
            loggedIn: true
        });
    });

    // Render Driver Application page
    app.get("/driver/application", function(req, res) {
        res.render("driverApplication");
    });

    // Render Owner Application page
    app.get("/owner/application", function(req, res) {
        res.render("ownerApplication");
    });

    // Render Owner Application page
    app.get("/owner/confirmation", function(req, res) {
        res.render("ownerConfirmation", {
            addressLineOne: req.query["address-line1"],
            addressLineTwo: req.query["address-line2"],
            city: req.query.city,
            region: req.query.region,
            postalCode: req.query["postal-code"],
            type: req.query.parkingSpotType,
            size: req.query.parkingSpotSize,
            description: req.query.parkingSpotDesc,
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
