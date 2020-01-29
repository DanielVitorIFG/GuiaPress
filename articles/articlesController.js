const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Articles');
const slugify = require('slugify');

router.get('/admin/articles',(req,res) => {
    Article.findAll({
        include: [{model: Category}] // join
    }).then(articles => {
        res.render('admin/articles/index',{articles:articles});
    })
});

router.get('/admin/articles/new', (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new',{categories:categories});
    });
});

router.post('/articles/save', (req,res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category 
    }).then(() => {
        res.redirect('/admin/articles');
    })
});

router.post('/articles/delete',(req,res) => {
    var id = req.body.id; // pegando o id do input hidden
    if (id != undefined) {
      if (!isNaN(id)) { // Se for um número
        Article.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/articles');
        });  
      }else {
        res.redirect('/admin/articles');
      }  
    }else {
        res.redirect('/admin/articles');
    }
});

router.get('/admin/articles/edit/:id', (req,res) => {
    let id = req.params.id;
    
    if(isNaN(id)) res.redirect('/admin/articles');
    
    Article.findByPk(id).then(article => {
        
        Category.findAll().then(categories => {
            res.render('admin/articles/edit', {categories:categories,article:article})
        })
    }).catch(err => {
        res.redirect('/');
    })
});

router.post('/articles/update', (req,res) => {
    let id = req.body.id; // id do input hidden
    let title = req.body.title // vem do input
    let body = req.body.body // body vem no text area
    let category = req.body.category // vem do select

    Article.update({title: title, body: body, slug: slugify(title), categoryId: category},{
        where: {
            id: id
        }
    }).then(err => {
        res.redirect('/admin/articles');
    })

});

router.get('/articles/page/:num', (req,res) => {
    var pageLimit = 4;

    let page = req.params.num;
    let offset = 0;

    (isNaN(page) || page == 0 || page == 1) ? offset = 0 : offset = (parseInt(page)-1)* pageLimit;  // offset multiplicado pelo numero de elemento que eu quero ter na página

    Article.findAndCountAll({
        limit: pageLimit,
        offset: offset,
        order: [['id','DESC']]
    }).then(articles => {
        let next;
        (offset + pageLimit >= articles.count) ? next = false : next = true;

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/page', {result: result, categories: categories})
        })
        
        //res.json(result);
    })
});


module.exports = router;