const Sequelize = require('sequelize');
const connection = require('../databases/connection');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: { //  Slug é um versão otimizada de um string para ser utilizada em rotas, nas urls.
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }   
});

Category.hasMany(Article);
Article.belongsTo(Category); // Um artigo pertence a uma categoria
//Article.sync({force:true}).then(() =>{});  // usando apenas na primeiras vez

module.exports = Article;