const express = require('express');
const router = express.Router();
const User = require('./Users.js');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req,res) => {
    res.send('Listagem de usuários');
});

router.get('/admin/users/create', (req,res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

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
});



module.exports = router;