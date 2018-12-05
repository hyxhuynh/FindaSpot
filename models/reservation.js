module.exports = function(sequelize, DataTypes) {
    var Reservation = sequelize.define("Reservation", {
        // Reservation time info
        reservationStart: DataTypes.DATE,
        reservationEnd: DataTypes.DATE
    });

    // import models for association
    const user = require("./user")(sequelize,DataTypes);
    const ParkingSpace = require("./ParkingSpace")(sequelize,DataTypes);

    // A Reservation has a parker (user), a user can make multiple Reservations
    Reservation.belongsTo(user, {as:"parker", foreignKey: "parkerID"});
    user.hasMany(Reservation, {foreignKey:"parkerID"});

    // A Reservation has a ParkingSpace, a ParkingSpace can have multiple Reservations
    Reservation.belongsTo(ParkingSpace);
    ParkingSpace.hasMany(Reservation);

    return Reservation;
};
