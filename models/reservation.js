module.exports = function(sequelize, DataTypes) {
    var Reservation = sequelize.define("Reservation", {
        // Corresponds to a ParkingSpace ID
        spaceID: DataTypes.INTEGER,

        // Corresponds to User ID
        reservingUserID: DataTypes.INTEGER,

        // Reservation time info
        reservationStart: DataTypes.DATE,
        reservationEnd: DataTypes.DATE
    });
    return Reservation;
};
