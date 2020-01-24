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
    res.render('index');
});


app.listen(8080,() =>{console.log('Meu servidor está rodando')});