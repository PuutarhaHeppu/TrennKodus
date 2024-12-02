const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: console.log,
    //logging: (...msg) => console.log(msg),
});

(async () => {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established succesfully');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
})();

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.exercises = require("./models/Exercise")(sequelize, DataTypes);

const sync = (async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully');
});

module.exports = {db, sync};