module.exports = function(sequelize, DataTypes) {
    var Reservation = sequelize.define("Reservation", {
        text: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return Reservation;
};
