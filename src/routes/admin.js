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
    // console.log(req);
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

app.post('/orders/add', isAdmin, (req, res) => {

    var clientName = req.body.clientname;
    var serviceType = req.body.servicetype;
    var machineType = req.body.machinetype;
    var orderDescription = req.body.orderdescription;

    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;

    if(clientName == "" || validateInput.test(clientName) == true) {
        req.flash('error', 'Nome do cliente inválido!');
        return sendRequestData('clientName');
    }

    if(serviceType == "" || validateInput.test(serviceType) == true) {
        req.flash('error', 'Nome do serviço inválido!');
        return sendRequestData('serviceType');
    }

    if(machineType == "" || validateInput.test(machineType) == true) {
        req.flash('error', 'Nome da máquina inválida!');
        return sendRequestData('machineType');
    }

    if(orderDescription == "" || validateInput.test(orderDescription) == true) {
        req.flash('error', 'Descrição do pedido inválida!');
        return sendRequestData('orderDescription');
    }

    function sendRequestData(input) {
        return res.render('orders/add.html', {
            client: clientName,
            service: serviceType,
            machine: machineType,
            order: orderDescription,
            input: input
        });
    }
    
    Order.create({
        client_id: clientName,
        service_type: serviceType,
        machine_type: machineType,
        service_description: orderDescription
    }).then(function() {
        req.flash('success', 'Pedido cadastrado com sucesso');
        res.redirect('/orders');
    }).catch(function(error) {
        req.flash('error', 'Não foi possível cadastrar com sucesso. Erro: ' + error);
        res.redirect('/orders');
    });
});

app.get('/orders', isAdmin, (req, res) => {
    res.redirect('orders/index');
}); 

app.get('/orders/index', isAdmin, (req, res) => {
    Order.findAll().then((order) => {
        res.render('orders/index.html', {orders: order});
        console.log("order: ", order);
    }).catch((err) => {
        console.log("err: ", err);
    })
}); 

module.exports = app;