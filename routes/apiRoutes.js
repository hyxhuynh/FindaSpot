const db = require("../models");
const sequelize = require("sequelize");
const Op =sequelize.Op;

module.exports = function(app) {

    // Get parking spaces near location
    app.get("/api/parkingspace", function(req,res) {
        console.log(req.query);
        const targLatitude = parseFloat(req.query.lat);
        const targLongitude = parseFloat(req.query.long);

        // If coordinates provided, search near coordinates
        if (targLatitude && targLongitude) {
            // Find spaces near coordinates
            db.ParkingSpace.findAll({
                where: {
                    // Limit results to within 1 degree of lat/long provided
                    latitude: {
                        [Op.between]: [(targLatitude-1), (targLatitude+1)]
                    },
                    longitude: {
                        [Op.between]: [targLongitude-1, targLongitude+1]
                    }
                },
                attributes: {include:
                    // Distance calculation
                    [[sequelize.literal("(6371 * acos ( "
                    + "cos( radians("+targLatitude+") ) "
                    + "* cos( radians( latitude ) ) "
                    + "* cos( radians( longitude ) - radians("+targLongitude+") ) "
                    + "+ sin(radians("+targLatitude+")) "
                    + "* sin(radians( latitude )) ))" ), "distance"]]
                },
                // Order by distance from provided coordinates
                order: [[sequelize.literal("distance ASC")]]
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
        // sample req.body
        //{
        // ownerID: 1,
        // address: 1325 4th ave,
        // city: Seattle,
        // state: WA,
        // postalCode: 98101,
        // latitude: 45.45,
        // longitude: 47.89,
        // spaceSize: "standard"
        // spaceCover: "garage",
        // price: "10",
        // description: "sample description"
        //}
        console.log(spaceInfo);

        db.ParkingSpace.create(spaceInfo).then( function(response) {
            res.status(201).json(response);
            console.log("PARKING SPACE DATA", data);
            // redirect to the /owner/confirmation route
            const url = require("url");
            res.redirect(url.format({
                pathname:"/owner/confirmation",
                query: data.dataValues
            }));
        }).catch(err => {

            if (err instanceof sequelize.ForeignKeyConstraintError) {
                console.log(err.message);
                res.status(400).send("400 BAD REQUEST: Invalid ownerID");
            } else if (err instanceof sequelize.ValidationError) {
                console.log(err.message);
                res.status(400).send("400 BAD REQUEST:\n"+err.message);
            } else {
                res.status(500).send("500 INTERNAL SERVER ERROR: Unknown error");
                throw err;
            }
        });
    });

    // Get parking space by id
    app.get("/api/parkingspace/:id", function(req,res) {
        const id = req.params.id;

        // Find spaces near coordinates
        db.ParkingSpace.findAll({
            where: { id: id },
        }).then( response => {
            res.json(response);
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
                res.status(200).json(response);
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

};
