const express = require('express');
const router = express.Router();
const User = express('./Users.js');

router.get('/admin/users', (req,res) => {
    res.send('Listagem de usuários');
});

router.get('/admin/users/create', (req,res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    res.json({email,password});
});



module.exports = router;