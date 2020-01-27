const express = require('express');
const app = express();
const connection = require('./databases/connection');
const bodyParser = require('body-parser');

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');

const Article = require('./articles/Articles');
const Category = require('./categories/Category');

connection
    .authenticate()
    .then(() => {console.log('Conexão feita com o banco de dados')})
    .catch((error) => {console.log(error)});

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/',categoriesController);
app.use('/',articlesController);

app.get('/', (req,res) => {
    Article.findAll({
        order: [
            ['id','DESC']
        ]
    }).then(articles => {      
        Category.findAll().then(categories => {
            res.render('index',{articles:articles,categories:categories});   
        });     
    });
});

app.get('/:slug', (req,res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('article',{article:article,categories:categories});   
            });     
        } else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    })   
});




app.listen(8080,() =>{console.log('Meu servidor está rodando')});