const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes ) => {
    const trainingProgram = sequelize.define(
        'trainingProgram',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {

        },
    );
    return Exercise;
}