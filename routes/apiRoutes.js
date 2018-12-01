var db = require("../models");

module.exports = function(app) {

    // Post new parking space
    app.post("/api/parkingspace", function(req, res) {
        let spaceInfo = req.body;

        console.log(spaceInfo);

        db.ParkingSpace.create(spaceInfo).then( function(response) {
            res.send(response);
        });
    });



    // Get all examples
    app.get("/api/examples", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        db.Example.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });
};
