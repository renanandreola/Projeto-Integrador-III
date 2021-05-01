if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const Order = require('../models/Order');
const bodyParser = require('body-parser');
const app = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('../_config/auth');
initializePassport(passport);
const {isAdmin} = require('../helpers/isAdmin');

//FLASH
app.use(flash());

//SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//MIDDLEWARE
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', isAdmin, (req, res) => {
    res.render('index.html');
    console.log(req);
});

app.get('/login', (req, res) => {
    res.render('login.html');
});

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/',
    failureFlash: true
}), (req, res, next) => {
    res.redirect('/');
});

app.get('/clients', isAdmin, (req, res) => {
    res.render('clients/index.html');
});

app.get('/clients/index', isAdmin, (req, res) => {
    res.render('clients/index.html');
}); 

app.get('/clients/add', isAdmin, (req, res) => {
    res.render('clients/add.html');
}); 

app.get('/orders/add', isAdmin, (req, res) => {
    res.render('orders/add.html');
}); 

app.post('/orders/add',  isAdmin, (req, res) => {
    Order.create({
        client_id: req.body.clientname,
        service_type: req.body.servicetype,
        machine_type: req.body.machinetype,
        service_description: req.body.orderdescription
    }).then(function() {
        console.log("Cadastro efetuado com sucesso!");
        res.redirect('/orders');
    }).catch(function(error) {
        res.send("Ocorreu um erro ao inserir este cadastro: " + error);
    });
});

app.get('/orders', isAdmin, (req, res) => {
    res.render('orders/index.html');
}); 

app.get('/orders/index', isAdmin, (req, res) => {
    res.render('orders/index.html');
}); 

module.exports = app;