const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes ) => {
    const Exercise = sequelize.define(
        'Exercise',
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
            muscleGroup: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {

        },
    );

    console.log(Exercise === sequelize.models.Exercise);
    return Exercise;
}
