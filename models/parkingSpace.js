module.exports = function(sequelize, DataTypes) {
    var ParkingSpace = sequelize.define("ParkingSpace", {
        // Owner corresponds to user ID
        ownerID: DataTypes.INTEGER,

        // Location by address string and lat/long
        address: DataTypes.STRING,
        latitude: DataTypes.DOUBLE,
        longitude: DataTypes.DOUBLE,

        // Particulars of space
        spaceSize: DataTypes.ENUM("standard","compact","motorcycle","rv"),
        spaceCover: DataTypes.ENUM("uncovered","covered","garage"),

        description: DataTypes.TEXT
    });
    return ParkingSpace;
};
