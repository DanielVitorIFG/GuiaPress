const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress','root','Dan7591538462', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;