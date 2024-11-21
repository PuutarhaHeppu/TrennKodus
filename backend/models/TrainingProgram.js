module.exports = (sequelize, DataTypes) => {
    const TrainingProgram = sequelize.define(
        'TrainingProgram',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // Model attributes are defined here
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            description: {
              type: DataTypes.STRING,
              allowNull: false
            },
        },
        {
          // Other model options go here
        },
    )

    // `sequelize.define` also returns the model
    console.log(TrainingProgram === sequelize.models.TrainingProgram); // true
    return TrainingProgram;
}