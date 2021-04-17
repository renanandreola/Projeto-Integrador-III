const express = require('express');
const Order = require('../models/Order');
const bodyParser = require('body-parser');
const app = express.Router();
const passport = require('passport');

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/login', (req, res) => {
    res.render('login.html');
});

app.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/admin/login",
    })(req,res,next);
})

app.get('/clients', (req, res) => {
    res.render('clients/index.html');
});

app.get('/clients/index', (req, res) => {
    res.render('clients/index.html');
}); 

app.get('/clients/add', (req, res) => {
    res.render('clients/add.html');
}); 

app.get('/orders/add', (req, res) => {
    res.render('orders/add.html');
}); 

app.post('/orders/add', (req, res) => {
    Order.create({
        client_id: req.body.clientname,
        service_type: req.body.servicetype,
        machine_type: req.body.machinetype,
        service_description: req.body.orderdescription
    }).then(function() {
        console.log("Cadastro efetuado com sucesso!");
        res.redirect('/orders/add');
    }).catch(function(error) {
        res.send("Ocorreu um erro ao inserir este cadastro: " + error);
    });
});

app.get('/orders', (req, res) => {
    res.render('orders/index.html');
}); 

app.get('/orders/index', (req, res) => {
    res.render('orders/index.html');
}); 

module.exports = app;