const db = require("../models");
const sequelize = require("sequelize");
const Op =sequelize.Op;

module.exports = function(app) {

    /***************************************
     *
     * API ROUTES for ParkingSpaces
     *
     ***************************************/

    // Get parking spaces near location
    // GET will Giving me information back
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
            res.status(404).end();
        }

    });

    // Post new parking space
    app.post("/api/parkingspace", function(req, res) {
        let spaceInfo = req.body;
        console.log(spaceInfo);

        // sample req.body
        //{
        // ownerId: 1,
        // address: 1325 4th ave,
        // latitude: 45.45,
        // longitude: 47.89,
        // spaceSize: "standard",
        // spaceCover: "garage",
        // price: "10",
        // description: "sample description"
        //}

        // Check for all required info
        if (spaceInfo.ownerId && spaceInfo.address && spaceInfo.latitude && spaceInfo.longitude && spaceInfo.spaceSize && spaceInfo.spaceCover && spaceInfo.price) {

            // Create space with info provided
            db.ParkingSpace.create(spaceInfo).then( function(response) {
                response.dataValues.redirect="HTTP://TEST";
                res.json(response);

                // Redirect was not working with AJAX POST request, using standard JSON response for now

                // console.log("PARKING SPACE response", response);
                // // redirect to the /owner/confirmation route
                // const url = require("url");
                // res.redirect(url.format({
                //     pathname:"/owner/confirmation",
                //     query: response.dataValues
                // }));

            }).catch(err => {

                if (err instanceof sequelize.ForeignKeyConstraintError) {
                    // Handles errors with key constraints
                    let msg = err.message;
                    console.log(msg);

                    if (msg.includes("ownerId")) {
                        res.status(400).send("400 BAD REQUEST: Invalid ownerId");
                    } else {
                        // Else unknown error cause, rethrow error
                        res.status(500).send("500 INTERNAL SERVER ERROR: Unknown ForeignKeyConstraintError");
                        throw err;
                    }
                } else if (err instanceof sequelize.ValidationError) {
                    // Handles validation errors
                    console.log(err.message);
                    res.status(400).send("400 BAD REQUEST:\n"+err.message);
                } else if (err instanceof sequelize.DatabaseError) {
                    let msg = err.message;
                    console.log(msg);

                    if (msg.includes("spaceSize")) {
                        // Error in setting spaceSize field
                        res.status(400).send("400 BAD REQUEST: spaceSize must be one of \"standard\", \"compact\",\"motorcycle\", \"rv\"");
                    } else if (msg.includes("spaceCover")) {
                        // Error in setting spaceCover field
                        res.status(400).send("400 BAD REQUEST: spaceCover must be one of \"uncovered\", \"covered\",\"garage\"");
                    } else {
                        // Else unknown error cause, rethrow error
                        res.status(500).send("500 INTERNAL SERVER ERROR: Unknown DatabaseError");
                        throw err;
                    }
                } else {
                    // Else unknown error cause, rethrow error
                    res.status(500).send("500 INTERNAL SERVER ERROR: Unknown error");
                    console.log(err.message);
                    throw err;
                }
            });
        } else {
            // Info was missing -> Bad Request
            res.status(400).send("400 BAD REQUEST: Missing information");
        }
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

    /***************************************
     *
     * API ROUTES for Reservations
     *
     ***************************************/

    // Route to get existing reservations
    app.get("/api/reservation", (req, res) => {
        // TODO: Add filtering to return only desired Reservations

        db.Reservation.findAll({
            include: [
                {
                    // Include inforation for user that placed the reservation
                    model: db.user, as: "parker",
                    // Attributes filters out to provide only relevant data so as to not include password, etc.
                    attributes: ["firstname","lastname","email"]
                },{
                    // Include inforation for user that placed the reservation
                    model: db.ParkingSpace,
                    // Attributes filters out to provide only relevant data
                    attributes: {
                        exclude: ["createdAt","updatedAt"],
                    },
                    include: [
                        {
                            // Include inforation for user that placed the reservation
                            model: db.user, as: "owner",
                            // Attributes filters out to provide only relevant data so as to not include password, etc.
                            attributes: ["firstname","lastname","email"]
                        }
                    ]
                }
            ]
        }).then( response => {
            res.json(response);
        });
    });

    // Route to create new Reservation on a ParkingSpace
    app.post("/api/reservation", (req, res) => {
        const data = req.body;
        console.log(data);

        // Create object to hold info for new Reservation
        let newReservation = {};

        // Set ID references for parker(user) and ParkingSpace
        newReservation.parkerId = data.parkerId;
        newReservation.ParkingSpaceId = data.ParkingSpaceId;

        // Check for reservationStart time, format to Date, otherwise give error response
        if (data.reservationStart) {
            newReservation.reservationStart = new Date(data.reservationStart);
        } else {
            return res.status(400).send("400 BAD REQUEST: reservationStart required");
        }

        // Check for reservationEnd time, format to Date, otherwise give error response
        if (data.reservationEnd){
            newReservation.reservationEnd = new Date(data.reservationEnd);
        } else {
            return res.status(400).send("400 BAD REQUEST: reservationEnd required");
        }

        console.log(newReservation);

        // Check for entry in all fields
        if ( !isNaN(newReservation.reservationStart.getTime()) && !isNaN(newReservation.reservationEnd)){
            db.Reservation.create(newReservation).then( response => {
                res.status(201).json(response);
            }).catch(err => {
                // If unknown error cause, rethrow error
                res.status(500).send("500 INTERNAL SERVER ERROR: Unknown error");
                console.log(err.message);
                throw err;
            });
        } else {
            // Info was missing -> Bad Request
            res.status(400).send("400 BAD REQUEST: Impromper date format");
        }
    });

    // Route to delete an existing Reservation
    app.delete("/api/reservation/:id", (req, res) => {
        const id = req.params.id;

        db.Reservation.destroy({
            where: {id:id}
        }).then( response => {
            res.json(response);
        });
    });
};
