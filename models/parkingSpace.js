module.exports = function(sequelize, DataTypes) {
    var ParkingSpace = sequelize.define("ParkingSpace", {
        // Owner corresponds to user ID
        ownerID: DataTypes.INTEGER,

        // Location by address string and lat/long
        address: DataTypes.STRING,
        latitude: {
            type: DataTypes.DOUBLE,
            // Min of -90 degrees/max of 90 degrees
            validate: { min: -90, max: 90 }
        },
        longitude: {
            type: DataTypes.DOUBLE,
            // Min of -180 degrees/max of 180 degrees
            validate: { min: -180, max: 180 }
        },

        // Particulars of space
        spaceSize: DataTypes.ENUM("standard","compact","motorcycle","rv"),
        spaceCover: DataTypes.ENUM("uncovered","covered","garage"),
        price: DataTypes.DOUBLE,
        description: DataTypes.TEXT
    });
    return ParkingSpace;
};
