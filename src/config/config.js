"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//     database: 'booking',
//     username: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     dialect: 'postgres'
// });
//host=localhost port=5433 dbname=postgres user=postgres password=xxxxxxx sslmode=prefer connect_timeout=10
const sequelize = new sequelize_1.Sequelize('postgres://postgres:postgres@localhost:5433/postgres?schema=public');
sequelize.authenticate()
    .then(() => {
    // console.log(sequelize);
    console.log('Database connection established successfully.');
})
    .catch(error => {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
