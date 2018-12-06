module.exports = function(sequelize, DataTypes) {
    const ParkingSpace = sequelize.define("ParkingSpace", {
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
        description: DataTypes.TEXT,
        ownerName: DataTypes.TEXT,
        ownerPhone: DataTypes.STRING,
        ownerEmail: DataTypes.STRING
    });

    // Set association with Users
    const user = require("./user")(sequelize,DataTypes);

    // A space has an owner(user), a user can own multiple spaces
    ParkingSpace.belongsTo(user, {as:"owner", foreignKey: "ownerId"});
    user.hasMany(ParkingSpace, {foreignKey:"ownerId"});

    return ParkingSpace;
};
