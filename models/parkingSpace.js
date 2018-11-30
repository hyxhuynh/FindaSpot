module.exports = function(sequelize, DataTypes) {
    var ParkingSpace = sequelize.define("ParkingSpace", {
        text: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return ParkingSpace;
};
