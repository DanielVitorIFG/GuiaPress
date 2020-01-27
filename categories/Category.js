const Sequelize = require('sequelize');
const connection = require('../databases/connection');


const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: { //  Slug é um versão otimizada de um string para ser utilizada em rotas, nas urls.
        type: Sequelize.STRING,
        allowNull: false
    }   
});


//Category.sync({force:true}).then(() =>{});  // usando apenas na primeiras vez

module.exports = Category;