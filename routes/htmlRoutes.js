var db = require("../models");
var auth = require("../auth/util");
module.exports = function(app) {
    // Load index page
    app.get("/", auth.isLoggedIn, function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbExamples,
                loggedIn: true
            });
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
