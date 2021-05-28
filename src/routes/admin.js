if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const Order = require('../models/Order');
const Client = require('../models/Client');
const Machine = require('../models/Machine');
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
    // if(req.isAuthenticated()){
    //     return res.redirect("/");
    // }
    res.render('login.html');
});

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/',
    failureFlash: true
}), (req, res, next) => {
    res.redirect('/');
});

app.get('/logout', isAdmin, (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

app.get('/clients', isAdmin, (req, res) => {
    Client.findAll()
    .then((clients) => {
        res.render('clients/index.html', {clients: clients});
    }).catch((err) => {
        console.log("err: ", err);
    });
});

app.get('/clients/index', isAdmin, (req, res) => {
    res.redirect('/admin/clients');
}); 

app.get('/clients/add', isAdmin, (req, res) => {
    res.render('clients/add.html');
}); 

app.get('/orders/add', isAdmin, (req, res) => {
    Client.findAll().then((clients) => {
        Machine.findAll().then((machines) => {
            res.render('orders/add.html', {clients: clients, machines: machines});
        }).catch((err) => {
            console.log('err: ' + err);
        })
    }).catch((err) => {
        console.log('err: ' + err);
    });
}); 


app.get('/machines', isAdmin, (req, res) => {
    Machine.findAll()
    .then((machines) => {
        res.render('machines/index.html', {machines: machines});
    }).catch((err) => {
        console.log("err: ", err);
    });
});

app.get('/machines/index', isAdmin, (req, res) => {
    res.redirect('/admin/machines');
}); 

app.get('/machines/add', isAdmin, (req, res) => {
    res.render('machines/add.html')
});

app.post('/clients/add', isAdmin, (req, res) => {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var cell = req.body.cell;
    var cep = req.body.cep;
    var state = req.body.state;
    var city = req.body.city;
    var district = req.body.district;
    var address = req.body.address;
    var number = req.body.number;
    var complement = req.body.complement;

    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}123456789\\]/;
    var validateInput2 = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
    var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(name == "" || validateInput.test(name) == true) {
        req.flash('error', 'Nome do cliente inválido');
        return sendRequestDataClient('name');
    }

    if(lastname == "" || validateInput.test(lastname) == true) {
        req.flash('error', 'Sobrenome do cliente inválido');
        return sendRequestDataClient('lastname');
    }

    if(email == "" || regexEmail.test(email) == false) {
        req.flash('error', 'E-mail do cliente inválido');
        return sendRequestDataClient('email');
    }

    if(phone == "" || phone.length != 14) {
        req.flash('error', 'Telefone do cliente inválido');
        return sendRequestDataClient('phone');
    }

    if(cell == "" || cell.length != 16) {
        req.flash('error', 'Celular do cliente inválido');
        return sendRequestDataClient('cell');
    }

    if(cep == "" || cep.length != 9) {
        req.flash('error', 'CEP do cliente inválido');
        return sendRequestDataClient('cep');
    }

    if(city == "" || validateInput.test(city) == true) {
        req.flash('error', 'Cidade do cliente inválido');
        return sendRequestDataClient('city');
    }

    if(district == "" || validateInput2.test(district) == true) {
        req.flash('error', 'Bairro do cliente inválido');
        return sendRequestDataClient('district');
    }

    if(address == "" || validateInput2.test(address) == true) {
        req.flash('error', 'Endereço do cliente inválido');
        return sendRequestDataClient('address');
    }

    if(number == "" || validateInput2.test(number) == true) {
        req.flash('error', 'Número do cliente inválido');
        return sendRequestDataClient('number');
    }

    if(complement == "" || validateInput2.test(complement) == true) {
        req.flash('error', 'Complemento do cliente inválido');
        return sendRequestDataClient('complement');
    }

    function sendRequestDataClient(input) {
        return res.render('orders/add.html', {
            cellphone: cell,
            cep: cep,
            city: city,
            district: district,
            address: address,
            number_address: number,
            complement: complement,
            email: email,
            state: state,
            username: name + " " + lastname,
            phone: phone,
            input: input,
        });
    }

    Client.create({
        cellphone: req.body.cell,
        cep: req.body.cep,
        city: req.body.city,
        district: req.body.district,
        address: req.body.address,
        number_address: req.body.number,
        complement: req.body.complement,
        email: req.body.email,
        state: req.body.state,
        username: req.body.name + " " + req.body.lastname,
        phone: req.body.phone
    }).then(function() {
        req.flash('success', 'Cliente cadastrado com sucesso');
        res.redirect('/admin/clients');
    }).catch(function(error) {
        req.flash('error', 'Não foi possível cadastrar o cliente com sucesso. Erro: ' + error);
        res.redirect('/admin/clients');
    });
    // res.render('clients/add.html');
}); 

app.post('/machines/add', isAdmin, (req, res) => {
    var machine_name = req.body.machine_name;
    var conservation_state = req.body.conservation_state;
    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}123456789\\]/;

    if(machine_name == "" || validateInput.test(machine_name) == true) {
        req.flash('error', 'Nome da maquina inválido');
        return sendRequestDataClient('machine_name');
    }

    if(conservation_state == "" || validateInput.test(conservation_state) == true) {
        req.flash('error', 'Estado de conservação inválido');
        return sendRequestDataClient('conservation_state');
    }

    function sendRequestDataClient(input) {
        return res.render('machines/add.html', {
            machine_name: machine_name,
            conservation_state: conservation_state,
            input: input,
        });
    }

    Machine.create({
        machine_name: machine_name,
        conservation_state: conservation_state,
    }).then(function() {
        req.flash('success', 'Máquina cadastrada com sucesso');
        res.redirect('/admin/machines');
    }).catch(function(error) {
        req.flash('error', 'Não foi possível cadastrar a máquina com sucesso. Erro: ' + error);
        res.redirect('/admin/machines');
    });
});

app.post('/orders/add', isAdmin, (req, res) => {

    Client.findAll().then((clients) => {
        Machine.findAll().then((machines) => {
            var clientName = req.body.clientName;
            var serviceType = req.body.servicetype;
            var machineType = req.body.machinetype;
            var orderDescription = req.body.orderdescription;

            Client.findOne({where:{id: clientName}}).then((client) => {
                Machine.findOne({where:{id: machineType}}).then((machine) => {
                    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;

                    if(clientName == "0") {
                        req.flash('error', 'Cliente Inválido!');
                        return sendRequestData('clientName');
                    }

                    if(serviceType == "" || validateInput.test(serviceType) == true) {
                        req.flash('error', 'Nome do serviço inválido!');
                        return sendRequestData('serviceType');
                    }

                    if(machineType == "0" || validateInput.test(machineType) == true) {
                        req.flash('error', 'Nome da máquina inválida!');
                        return sendRequestData('machineType');
                    }

                    if(orderDescription == "" || validateInput.test(orderDescription) == true) {
                        req.flash('error', 'Descrição do pedido inválida!');
                        return sendRequestData('orderDescription');
                    }

                    function sendRequestData(input) {
                        return res.render('orders/add.html', {
                            clientid: clientName,
                            service: serviceType,
                            machineid: machineType,
                            order: orderDescription,
                            input: input,
                            clients: clients,
                            machines: machines,
                            name: client.username,
                            mname: machine.machine_name
                        });
                    }
                    
                    Order.create({
                        clientId: clientName,
                        service_type: serviceType,
                        machineId: machineType,
                        service_description: orderDescription
                    }).then(function() {
                        req.flash('success', 'Pedido cadastrado com sucesso');
                        res.redirect('/orders');
                    }).catch(function(error) {
                        req.flash('error', 'Não foi possível cadastrar com sucesso. Erro: ' + error);
                        res.redirect('/orders');
                    });
                }).catch((err) => {
                    console.log('err: ' + err);
                });
            }).catch((err) => {
                console.log('err: ' + err);
            });
        }).catch((err) => {
            console.log('err: ' + err);
        });
    }).catch((err) => {
        console.log('err: ' + err);
    });
});

app.get('/orders', isAdmin, (req, res) => {

    let {order = 'ASC', limit = 20, page = 1} = req.query;

    limit = parseInt(limit);
    page = parseInt(page - 1);

    Order.findAll({
        include: [Client, Machine],
        order: [
            ['id', order]
        ],
        limit: limit,
        offset: page * limit
    }).then((orders) => {
        res.render('orders/index.html', {orders: orders, offset: (page * limit) + 1});
    }).catch((err) => {
        console.log("err: ", err);
    });
}); 

app.get('/orders/index', isAdmin, (req, res) => {
    res.redirect('/orders');
}); 

app.get('/orders/view/:id', isAdmin, (req, res) => {
    var id = req.params.id;
    Order.findOne({
        where: {
            id: id
        },
        include: [Client, Machine]
    }).then((order) => {
        if (!order) {
            res.render('../views/notFound.html');
        } else {
            res.render('../views/orders/view.html', {order: order});
        }
    }).catch((err) => {
        res.render('../views/notFound.html');
    })
});

app.get('/clients/view/:id', isAdmin, (req, res) => {
    var id = req.params.id;
    Client.findOne({
        where: {
            id: id
        }
    }).then((client) => {
        if (!client) {
            res.render('../views/notFound.html');
        } else {
            res.render('../views/clients/view.html', {client: client});
        }
    }).catch((err) => {
        res.render('../views/notFound.html');
    })
});

module.exports = app;