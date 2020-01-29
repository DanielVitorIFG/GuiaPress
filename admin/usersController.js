const express = require('express');
const router = express.Router();
const User = require('./Users.js');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req,res) => {
    User.findAll().then(users => {
        res.render('admin/users/index',{users:users});
    })
});

router.get('/admin/users/create', (req,res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user == undefined) { // se o email não existir no banco, aí sim ele irá criar um novo
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password,salt);
        
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch(err => {
                res.redirect('/');
            });
            //res.json({email,hash});
        } else {
            res.redirect('/admin/users/create');
        }
    })

});

router.post('/users/delete', (req,res) => {
    let id = req.body.id; // pegando o id do input hidden
    if(id != undefined) {
        if(!isNaN(id)) {
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/users');
            })
        } else {
            res.redirect('/admin/users');
        }
    } else {
        res.redirect('/admin/users');
    }
})

router.get('/login', (req,res) => {
    res.render('admin/users/login');
})

router.post('/authenticate', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{ email: email}}).then(user => {
        if(user != undefined) { // Se existe um usuário com este email
            // Validar senha
            let correct = bcrypt.compareSync(password,user.password); // comparando a senha passada com a senha no banco de dados

            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            } else {
                res.redirect('/login'); 
            }
        
        }else {
            res.redirect('/login');   
        }
    });
})

router.get('/logout', (req,res) => {
   req.session.user = undefined;
   res.redirect('/'); 
});

module.exports = router;