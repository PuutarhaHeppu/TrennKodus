// const { Sequelize } = require("sequelize");

// module.exports = (sequelize, Sequelize) => {
//     const Exercise = sequelize.define(
//     'Exercise',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         // Model attributes are defined here
//         name: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         description: {
//           type: DataTypes.STRING,
//           // allowNull defaults to true
//         },
//         muscleGroup: {
//           type: DataTypes.STRING,
//           // allowNull defaults to true
//         },
//     },
//     {
//       // Other model options go here
//     },
//   );
  
//   // `sequelize.define` also returns the model
//   console.log(Exercise === sequelize.models.Exercise); // true
//   return Exercise;
// }
