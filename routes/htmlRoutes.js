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

    // Render Driver Application page
    app.get("/googleMapsPage", function(req, res) {
        res.render("googleMaps");
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
            city: req.query.city,
            state: req.query.state,
            postalCode: req.query.postalCode,
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
