const Sequelize = require('sequelize');

const connection = new Sequelize('schemaguiapress','root','Dan7591538462', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;