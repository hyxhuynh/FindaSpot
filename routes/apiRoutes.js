var db = require("../models");

module.exports = function(app) {

    // Get parking spaces near location
    app.get("/api/parkingspace", function(req,res) {
        console.log(req.query);
        const latitude = req.query.lat;
        const longitude = req.query.long;

        // If coordinates provided, search near coordinates
        if (latitude && longitude) {
            // Find spaces near coordinates
            db.ParkingSpace.findAll({
                where: {
                    latitude: latitude,
                    longitude: longitude
                }
            }).then( response => {
                res.json(response);
            });
        } else {
            res.status(400).end();
        }

    });

    // Post new parking space
    app.post("/api/parkingspace", function(req, res) {
        let spaceInfo = req.body;

        console.log(spaceInfo);

        db.ParkingSpace.create(spaceInfo).then( function(response) {
            res.status(201).send(response);
        });
    });

    // Update parking space info
    app.put("/api/parkingspace/:id", function (req, res) {
        const id = req.params.id;
        // TODO: Validate info passed in body to ensure only valid fields and no update to id
        const updatedInfo = req.body;

        if (id) {
            db.ParkingSpace.update(updatedInfo,
                {
                    where: {id:id}
                }
            ).then( function(response) {
                res.status(200).send(response);
            });
        } else {
            res.status(400).end();
        }
    });

    // Delete parking space info
    app.delete("/api/parkingspace/:id", (req, res) => {
        const id = req.params.id;
        db.ParkingSpace.destroy({
            where: {id:id}
        }).then( response => {
            res.json(response);
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
